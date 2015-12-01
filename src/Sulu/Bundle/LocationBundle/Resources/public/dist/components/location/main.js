define([],function(){"use strict";var a={translations:{configureLocation:"sulu.location.configure",locateAddress:"sulu.location.locate-address",title:"sulu.location.title",street:"sulu.location.street",number:"sulu.location.number",code:"sulu.location.code",town:"sulu.location.town",country:"sulu.location.country",coordinates:"sulu.location.coords",map:"sulu.location.map",search:"sulu.location.search"},instanceName:null,mapProviders:{},countries:{},geolocationUrl:"",geolocatorName:"nominatim"},b={draggableMarker:!1,positionUpdateCallback:null},c={title:"",street:"",number:"",code:"",country:"","long":0,lat:0,zoom:0,mapProvider:"google"},d={contentContainerClass:"location-content-container",contnetFieldContainerClass:"location-content-fields-container",contentClass:"location-content",configureButtonClass:"location-content-configure",overlayClass:"location-overlay-content",formId:"location-content-overlay-form",mapElementId:"location-map",mapElementClass:"location-map",overlayMapElementId:"location-overlay-map",overlayMapElementClass:"location-overlay-map",locateAddressClass:"location-locate-address-button",geolocatorSearchClass:"geolocator-search",contentFieldContainerClass:"location-content-field-container",mapProviderSelectClass:"location-content-provider-select"},e={RELOAD_DATA:"sulu.location.reload_data"},f={skeleton:['<div class="<%= constants.contentContainerClass %> white-box form-element">','<div class="header"><span class="fa-gears <%= constants.configureButtonClass %> icon right border"></span></div>','<div class="content <%= constants.contentClass %>">','<div class="grid-row">','<div class="grid-col-6 ">','<div id="<%= constants.mapElementId %>" class="content"></div>',"</div>",'<div class="grid-col-6 <%= constants.contentFieldContainerClass %>">',"</div>","</div>","</div>","</div>"].join(""),contentFields:['<div class="grid">','<div class="grid-row">','<div class="grid-col-3 text"><%= translate(translations.title) %>:</div>','<div class="grid-col-9"><%= data.title %></div>',"</div>",'<div class="grid-row no-spacing">','<div class="grid-col-3 text"><%= translate(translations.street) %></div>','<div class="grid-col-9"><%= data.street %></div>',"</div>",'<div class="grid-row no-spacing">','<div class="grid-col-3 text"><%= translate(translations.number) %>:</div>','<div class="grid-col-9"><%= data.number %></div>',"</div>",'<div class="grid-row no-spacing">','<div class="grid-col-3 text"><%= translate(translations.code) %>:</div>','<div class="grid-col-9"><%= data.code %></div>',"</div>",'<div class="grid-row no-spacing">','<div class="grid-col-3 text"><%= translate(translations.town) %>:</div>','<div class="grid-col-9"><%= data.town %></div>',"</div>",'<div class="grid-row">','<div class="grid-col-3 text"><%= translate(translations.country) %>:</div>','<div class="grid-col-9"><%= data.country %></div>',"</div>",'<div class="grid-row">','<div class="grid-col-3 text"><%= translate(translations.coordinates) %>:</div>','<div class="grid-col-9"><%= data.long %>, <%= data.lat %>, <%= data.zoom %></div>',"</div>","</div>"].join(""),overlay:['<div class="<%= constants.overlayClass %> grid">','<form id="<%= constants.formId %>">','<div class="grid-row">','<div class="form-group grid-col-12">','<label for="title"><%= translate(translations.title) %></label>','<input class="form-element" type="text" placeholder="<%= translate(translations.title) %>" data-mapper-property="title" value="<%= data.title %>"/ >',"</div>","</div>",'<div class="grid-row">','<div class="form-group grid-col-6">','<label for="street"><%= translate(translations.street) %></label>','<input class="form-element" type="text" data-mapper-property="street" value="<%= data.street %>"/ >',"</div>",'<div class="form-group grid-col-6">','<label for="number"><%= translate(translations.number) %></label>','<input class="form-element" type="text" data-mapper-property="number" value="<%= data.number %>"/ >',"</div>","</div>",'<div class="grid-row">','<div class="form-group grid-col-6">','<label for="code"><%= translate(translations.code) %></label>','<input class="form-element" type="text" data-mapper-property="code" value="<%= data.code %>"/ >',"</div>",'<div class="form-group grid-col-6">','<label for="town"><%= translate(translations.town) %></label>','<input class="form-element" type="text" data-mapper-property="town" value="<%= data.town %>"/ >',"</div>","</div>",'<div class="grid-row">','<div class="form-group grid-col-6">','<label for="country"><%= translate(translations.country) %></label>','<select class="form-element" name="country" data-mapper-property="country">',"<% _.each(countries, function (name, key) { %>",'<option <% if (key == data.country) { %>selected="selected" <% }; %>value="<%= key %>"><%= name %></option>',"<% }); %>","</select>","</div>","</div>",'<h2 class="divider"><%= translate(translations.map) %></h2>','<div class="grid-row">','<div class="form-group grid-col-6">','<label for="map_provider">Map Provider</label>','<select class="<%= constants.mapProviderSelectClass %> form-element" name="map_provider" class="map-provider" data-mapper-property="mapProvider">',"<% _.each(mapProviders, function (provider, key) { %>",'<option <% if (key == data.mapProvider) { %>selected="selected" <% }; %>value="<%= key %>"><%= provider.title %></option>',"<% }); %>","</select>","</div>","</div>",'<div class="grid-row">','<div class="form-group grid-col-12">','<label for="title"><%= translate(translations.search) %></label>','<div class="<%= constants.geolocatorSearchClass %>" type="text" placeholder="<% translations.search %>" ></div>',"</div>","</div>",'<div class="grid-row no-spacing">','<div class="form-group grid-col-12">',"<label><%= translate(translations.coordinates) %></label>","</div>","</div>",'<div class="grid-row coordinate-fields">','<div class="form-group grid-col-5">','<input class="form-element longitude" type="text" data-mapper-property="long" value="<%= data.long %>"/ >',"</div>",'<div class="form-group grid-col-5">','<input class="form-element latitude" type="text" data-mapper-property="lat" value="<%= data.lat %>"/ >',"</div>",'<div class="form-group grid-col-2">','<input class="form-element zoom" type="text" data-mapper-property="zoom" value="<%= data.zoom %>"/ >',"</div>","</div>",'<div class="grid-row">','<div class="grid-col-12">','<div id="<%= constants.overlayMapElementId %>" class="<%= constants.overlayMapElementClass %>"/>',"</div>",'<div class="small-font grey-font">Move pointer to change location on map</div>',"</div>","</form>","</div>"].join("")};return{maps:{},options:{},$button:null,$formContent:null,overlayContent:null,mapInstance:null,currentMapProviderName:null,data:{},formData:{},_template:function(a,b){var c=f[a],d=this.sandbox.util.extend(!0,{},{constants:this.constants,translations:this.options.translations,translate:this.sandbox.translate},b);return this.sandbox.util.template(c,d)},initialize:function(){this.options=this.sandbox.util.extend(!0,{},a,this.options),this.constants=this.sandbox.util.extend(!0,{},d),this.constants.formId+="-"+this.options.instanceName,this.constants.mapElementId+="-"+this.options.instanceName,this.constants.overlayMapElementId+="-"+this.options.instanceName,this.configureMaps(),this.loadData(),this.createComponent()},configureMaps:function(){this.maps={content:{elementId:this.constants.mapElementId,draggableMarker:!1,positionUpdateCallback:function(){},zoomChangeCallback:function(){}},overlay:{elementId:this.constants.overlayMapElementId,draggableMarker:!0,positionUpdateCallback:function(a,b){this.updateCoordinates(a,b,null)}.bind(this),zoomChangeCallback:function(a){this.updateCoordinates(null,null,a)}.bind(this)}}},loadData:function(){this.data=this.sandbox.util.extend(!0,{},c,this.sandbox.dom.data(this.$el,"location")),this.formData=this.data},getFormData:function(){return this.sandbox.form.getData("#"+this.constants.formId)},initializeFormContent:function(){this.formData=this.data,this.$formContent=this.sandbox.dom.createElement(this._template("overlay",{data:this.formData,mapProviders:this.options.mapProviders,countries:this.options.countries}))},createComponent:function(){this.renderSkeleton(),this.renderContentFields(),this.renderMap("content",this.data),this.startOverlay(),this.bindEvents()},bindEvents:function(){this.sandbox.on("husky.overlay.location-content."+this.options.instanceName+".opened",this.createForm.bind(this)),this.sandbox.on("husky.overlay.location-content."+this.options.instanceName+".initialized",function(){this.startFormComponents()}.bind(this)),this.sandbox.on("husky.auto-complete."+this.options.instanceName+".geolocator.search.select",this.updateLocationFromLocation.bind(this)),this.sandbox.on(e.RELOAD_DATA,function(){this.loadData(),this.formData=this.data,this.renderContentFields(),this.renderMap("content",this.data)}.bind(this))},updateLocationFromLocation:function(a){this.updateCoordinates(a.longitude,a.latitude),this.renderMap("overlay",{"long":a.longitude,lat:a.latitude,zoom:this.formData.zoom})},updateLocation:function(){this.renderMap("overlay",{"long":this.formData["long"],lat:this.formData.lat,zoom:this.formData.zoom})},updateCoordinates:function(a,b,c){var d=$("#"+this.constants.formId);a&&this.sandbox.dom.find(".longitude",d).val(a),b&&this.sandbox.dom.find(".latitude",d).val(b),c&&this.sandbox.dom.find(".zoom",d).val(c)},renderSkeleton:function(){this.sandbox.dom.html(this.$el,this._template("skeleton",this.data))},renderContentFields:function(){this.sandbox.dom.find("."+this.constants.contentFieldContainerClass,this.$el).html(this._template("contentFields",{data:this.data}))},renderMap:function(a,c){var d=this.maps[a],e=d.elementId,f=this.formData.mapProvider,g=this.options.mapProviders[f],h=e+"-inner",i=this.sandbox.util.extend({},b,d);return void 0===g?void window.alert('Map provider "'+f+'" is not configured'):void(null===this.mapInstance||this.currentMapProviderName!=f?require(["map/"+f],function(a){var b=this.sandbox.dom.find("#"+e);b.empty().append(this.sandbox.dom.createElement('<div id="'+h+'" class="'+this.constants.mapElementClass+'"></div>'));var d=new a(h,g,i);d.show(c["long"],c.lat,c.zoom),this.mapInstance=d}.bind(this)):this.mapInstance.show(c["long"],c.lat,c.zoom))},startFormComponents:function(){this.sandbox.start([{name:"auto-complete@husky",options:{el:this.sandbox.dom.find("."+this.constants.geolocatorSearchClass,this.$formContent),instanceName:this.options.instanceName+".geolocator.search",getParameter:"query",suggestionImg:"map-marker",remoteUrl:this.options.geolocatorUrl+"?providerName=google",valueKey:"name",resultKey:"locations"}}])},createForm:function(){this.initializeFormContent(),this.sandbox.form.create("#"+this.constants.formId),this.renderMap("overlay",this.data),this.sandbox.dom.find(".coordinate-fields input").on("change",function(){var a=$("#"+this.constants.formId);this.formData["long"]=this.sandbox.dom.find(".longitude",a).val(),this.formData.lat=this.sandbox.dom.find(".latitude",a).val(),this.formData.zoom=this.sandbox.dom.find(".zoom",a).val(),this.updateLocation()}.bind(this)),this.sandbox.dom.find("."+this.constants.mapProviderSelectClass).on("change",function(a){this.formData.mapProvider=$(a.currentTarget).val(),this.renderMap("overlay",{"long":this.formData["long"],lat:this.formData.lat,zoom:this.formData.zoom})}.bind(this))},startOverlay:function(){var a=this.sandbox.dom.createElement("<div></div>");this.initializeFormContent(),this.overlayContent=a,this.sandbox.dom.append(this.$el,a),this.sandbox.start([{name:"overlay@husky",options:{triggerEl:this.sandbox.dom.find("."+this.constants.configureButtonClass,this.$el),el:a,removeOnClose:!1,container:this.$el,instanceName:"location-content."+this.options.instanceName,skin:"wide",slides:[{title:this.sandbox.translate(this.options.translations.configureLocation),data:this.$formContent,okCallback:function(){this.data=this.getFormData(),this.sandbox.dom.data(this.$el,"location",this.data),this.sandbox.emit("sulu.preview.update",this.$el,this.data),this.sandbox.emit("sulu.content.changed"),this.sandbox.emit(e.RELOAD_DATA)}.bind(this)}]}}])}}});