define(["sulucontent/model/content"],function(a){"use strict";return{stateDropdownItems:{publish:function(){return{id:"publish",title:this.sandbox.translate("edit-toolbar.state-publish"),icon:"publish",callback:function(){this.changeState(2)}.bind(this)}},test:function(){return{id:"test",title:this.sandbox.translate("edit-toolbar.state-test"),icon:"test",callback:function(){this.changeState(1)}.bind(this)}}},stateDropdownTemplates:{none:function(){return[]},test:function(){return[this.stateDropdownItems.publish.call(this)]},publish:function(){return[this.stateDropdownItems.test.call(this)]}},initialize:function(){if(this.bindCustomEvents(),"list"===this.options.display)this.renderList();else if("form"===this.options.display)this.renderForm();else if("column"===this.options.display)this.renderColumn();else{if("settings"!==this.options.display)throw"display type wrong";this.renderForm({settings:!0})}},bindCustomEvents:function(){this.sandbox.on("sulu.content.content.delete",function(a){this.del(a)},this),this.sandbox.on("sulu.content.contents.save",function(a,b){this.save(a,b)},this),this.sandbox.on("sulu.content.contents.load",function(a,b,c){this.load(a,b,c)},this),this.sandbox.on("sulu.content.contents.new",function(a){this.add(a)},this),this.sandbox.on("sulu.content.contents.delete",function(a){this.delContents(a)},this),this.sandbox.on("sulu.content.contents.getRL",function(a,b){this.getResourceLocator(a,b)},this),this.sandbox.on("sulu.content.contents.list",function(a,b){this.sandbox.emit("husky.navigation.uncollapse"),this.sandbox.emit("sulu.router.navigate","content/contents/"+(a?a:this.options.webspace)+"/"+(b?b:this.options.language))},this),this.sandbox.on("sulu.content.contents.getDropdownForState",function(a,b){b(this.getDropdownForState(a))},this),this.sandbox.on("sulu.content.contents.getStateDropdownItem",function(a,b){b(this.getStateDropdownItem(a))},this)},getStateWithId:function(a){var b="";switch(a){case 0:b="none";break;case 1:b="test";break;case 2:b="publish";break;default:this.sandbox.logger.error("No state for id",a)}return b},getDropdownForState:function(a){var b=this.getStateWithId(a);return this.stateDropdownTemplates[b].call(this)},getStateDropdownItem:function(a){a=0===a?1:a;var b=this.getStateWithId(a);return this.stateDropdownItems[b].call(this)},getResourceLocator:function(a,b){var c="/admin/content/resourcelocator.json?"+(this.options.parent?"parent="+this.options.parent+"&":"")+(this.options.id?"uuid="+this.options.id+"&":"")+"title="+a+"&webspace="+this.options.webspace+"&language="+this.options.language;this.sandbox.util.load(c).then(function(a){b(a.resourceLocator)})},del:function(b){this.showConfirmSingleDeleteDialog(function(c){if(c)if(this.sandbox.emit("sulu.edit-toolbar.content.item.loading","options-button"),b!==this.content.get("id")){var d=new a({id:b});d.fullDestroy(this.options.webspace,this.options.language,{processData:!0,success:function(){this.sandbox.emit("sulu.router.navigate","content/contents/"+this.options.webspace+"/"+this.options.language),this.sandbox.emit("sulu.preview.deleted",b)}.bind(this)})}else this.content.fullDestroy(this.options.webspace,this.options.language,{processData:!0,success:function(){this.sandbox.emit("husky.navigation.show"),this.sandbox.emit("husky.navigation.uncollapse",!1),this.sandbox.emit("sulu.app.content.dimensions-change",{width:820,left:250,paddingLeft:50}),this.sandbox.emit("sulu.router.navigate","content/contents/"+this.options.webspace+"/"+this.options.language),this.sandbox.emit("sulu.preview.deleted",b)}.bind(this)})}.bind(this),this.options.id)},showConfirmSingleDeleteDialog:function(a){if(a&&"function"!=typeof a)throw"callback is not a function";var b={templateType:null,title:this.sandbox.translate("content.delete.dialog.title"),content:this.sandbox.translate("content.delete.dialog.content"),buttonCancelText:this.sandbox.translate("content.delete.dialog.cancel"),buttonSubmitText:this.sandbox.translate("content.delete.dialog.submit")};this.sandbox.emit("sulu.dialog.confirmation.show",{content:{title:b.title,content:b.content},footer:{buttonCancelText:b.buttonCancelText,buttonSubmitText:b.buttonSubmitText},callback:{submit:function(){this.sandbox.emit("husky.dialog.hide"),a&&a(!0)}.bind(this),cancel:function(){this.sandbox.emit("husky.dialog.hide"),a&&a(!1)}.bind(this)}},b.templateType)},changeState:function(a){this.sandbox.emit("sulu.content.contents.state.change"),this.content.stateSave(this.options.webspace,this.options.language,a,null,{success:function(){this.sandbox.emit("sulu.content.contents.state.changed",a),this.sandbox.emit("sulu.labels.success.show","labels.state-changed.success-desc","labels.state-changed.success","sulu.content.contents.state.label")}.bind(this),error:function(){this.sandbox.emit("sulu.content.contents.state.changeFailed"),this.sandbox.emit("sulu.labels.error.show","labels.state-changed.error-desc","labels.state-changed.error","sulu.content.contents.state.label"),this.sandbox.logger.log("error while saving profile")}.bind(this)})},save:function(a,b){this.content.set(a),this.content.fullSave(b,this.options.webspace,this.options.language,this.options.parent,null,null,{success:function(a){var b=a.toJSON();this.options.id?this.sandbox.emit("sulu.content.contents.saved",b.id):(this.sandbox.sulu.viewStates.justSaved=!0,this.sandbox.emit("sulu.router.navigate","content/contents/"+this.options.webspace+"/"+this.options.language+"/edit:"+b.id+"/content"))}.bind(this),error:function(){this.sandbox.logger.log("error while saving profile")}.bind(this)})},load:function(a,b,c){this.sandbox.emit("sulu.router.navigate","content/contents/"+(b?b:this.options.webspace)+"/"+(c?c:this.options.language)+"/edit:"+a+"/content")},add:function(a){a?this.sandbox.emit("sulu.router.navigate","content/contents/"+this.options.webspace+"/"+this.options.language+"/add:"+a.id+"/content"):this.sandbox.emit("sulu.router.navigate","content/contents/"+this.options.webspace+"/"+this.options.language+"/add/content")},delContents:function(b){return b.length<1?void this.sandbox.emit("sulu.dialog.error.show","No contents selected for deletion!"):void this.confirmDeleteDialog(function(c){c&&b.forEach(function(b){var c=new a({id:b});c.fullDestroy(this.options.webspace,this.options.language,{success:function(){this.sandbox.emit("husky.datagrid.row.remove",b)}.bind(this),error:function(){}})}.bind(this))}.bind(this))},confirmDeleteDialog:function(a){if(a&&"function"!=typeof a)throw"callback is not a function";this.sandbox.emit("sulu.dialog.confirmation.show",{content:{title:"Be careful!",content:"<p>The operation you are about to do will delete data.<br/>This is not undoable!</p><p>Please think about it and accept or decline.</p>"},footer:{buttonCancelText:"Don't do it",buttonSubmitText:"Do it, I understand"},callback:{submit:function(){this.sandbox.emit("husky.dialog.hide"),a&&a(!0)}.bind(this),cancel:function(){this.sandbox.emit("husky.dialog.hide"),a&&a(!1)}.bind(this)}})},renderList:function(){var a=this.sandbox.dom.createElement('<div id="contacts-list-container"/>');this.html(a),this.sandbox.start([{name:"content/components/list@sulucontent",options:{el:a}}])},renderColumn:function(){var a=this.sandbox.dom.createElement('<div id="contacts-column-container"/>');this.html(a),this.sandbox.start([{name:"content/components/column@sulucontent",options:{el:a,webspace:this.options.webspace,language:this.options.language}}])},renderForm:function(b){var c=this.sandbox.dom.createElement('<div id="contacts-form-container"/>'),d=this.sandbox.dom.createElement('<div id="preview-container"/>');b="object"==typeof b?b:{content:!0},this.html(c),this.sandbox.dom.append("#preview",d),this.content=new a,this.options.id?(this.sandbox.emit("husky.navigation.collapse",!0),this.content=new a({id:this.options.id}),this.content.fullFetch(this.options.webspace,this.options.language,!0,{success:function(a){var d=[{name:"content/components/form@sulucontent",options:{el:c,id:this.options.id,data:a.toJSON(),webspace:this.options.webspace,language:this.options.language,preview:this.options.preview?this.options.preview:!1,tab:b}}];d.push({name:"content/components/preview@sulucontent",options:{el:"#preview-container",toolbar:{resolutions:[1680,1440,1024,800,600,480],showLeft:!0,showRight:!0},mainContentElementIdentifier:"content",iframeSource:{url:"/admin/content/preview/",webspace:this.options.webspace,language:this.options.language,id:this.options.id}}}),this.sandbox.start(d)}.bind(this),error:function(){this.sandbox.logger.log("error while fetching content")}.bind(this)})):(this.sandbox.emit("husky.navigation.uncollapse"),this.sandbox.start([{name:"content/components/form@sulucontent",options:{el:c,data:this.content.toJSON(),webspace:this.options.webspace,language:this.options.language,preview:this.options.preview?!0:!1,tab:b}}]))}}});