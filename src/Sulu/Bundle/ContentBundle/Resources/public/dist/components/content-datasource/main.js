define([],function(){"use strict";var a={options:{rootUrl:null,selectedUrl:null,resultKey:null,selected:null,webspace:null,locale:null,selectCallback:function(a){}},templates:{columnNavigationContainer:"<div/>"}},b={responsive:!1,actionIcon:"fa-check",showOptions:!1,sortable:!1,showStatus:!1},c="smart-content.datasource.";return{defaults:a,events:{names:{setSelected:{postFix:"set-selected",type:"on"}},namespace:c},initialize:function(){this.selected=this.options.selected,this.render(),this.columnNavigationOptions=this.sandbox.util.extend(!0,{},b,{el:this.$columnNavigationElement,instanceName:"smart-content-"+this.options.instanceName,url:this.getUrl(),linkedName:"linked",typeName:"type",hasSubName:"hasChildren",resultKey:this.options.resultKey,selected:this.selected,actionCallback:function(a){this.selected=a.id,this.options.selectCallback(a.id,a.path)}.bind(this)}),this.startColumnNavigation(this.columnNavigationOptions).then(this.bindCustomEvents.bind(this))},getUrl:function(){return this.selected?this.prepareUrl(this.options.selectedUrl):this.prepareUrl(this.options.rootUrl)},prepareUrl:function(a){return a=a.replace("{locale}",this.options.locale),a=a.replace("{webspace}",this.options.webspace),a=a.replace("{datasource}",this.selected)},startColumnNavigation:function(a){return this.sandbox.start([{name:"column-navigation@husky",options:a}])},render:function(){this.$columnNavigationElement&&this.sandbox.stop(this.$columnNavigationElement),this.$columnNavigationElement=this.sandbox.dom.createElement(this.templates.columnNavigationContainer()),this.html(this.$columnNavigationElement)},setSelected:function(a){this.selected=a,this.sandbox.emit("husky.column-navigation.smart-content-"+this.options.instanceName+".set-options",{selected:a,url:this.getUrl()})},bindCustomEvents:function(){this.events.setSelected(this.setSelected.bind(this))}}});