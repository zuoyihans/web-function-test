(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{35:function(e,t,a){e.exports=a(52)},40:function(e,t,a){},52:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(25),o=a.n(i),c=(a(40),a(3)),s=a(4),l=a(7),u=a(5),p=a(6),m=a(27),d=a(20),h=a(10),f=a(9),b=a.n(f),v=a(12),O=a(2),j=a(14),E=a(15),y=a(1),F=function(e){return{type:"INIT_OBJ_LEFT_FILES",objFiles:Object(y.a)({},e)}},N=function(e){return{type:"CHANGE_MODULE_TYPE",currentModel:e}},P=function(e){return{type:"UPDATE_CURRENT_FILE_DETAIL",cunrrentFileDetail:Object(y.a)({},e)}},C=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={value:a.props.value,name:a.props.name,updateProps:a.props.updateProps},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"handleBlur",value:function(e){this.state.updateProps(this.state.value)}},{key:"handleKeyUp",value:function(e){13===e.keyCode&&this.state.updateProps(this.state.value)}},{key:"updateInput",value:function(e){this.setState({value:e})}},{key:"componentWillReceiveProps",value:function(e){this.setState(Object(y.a)({},e))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"input-group input-group-sm"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"},this.state.name,":")),r.a.createElement("input",{type:"text",className:"form-control",value:this.state.value,onChange:function(t){return e.updateInput(t.target.value)},onKeyUp:function(t){return e.handleKeyUp(t)},onBlur:function(t){return e.handleBlur(t)}}))}}]),t}(r.a.Component),k=function(e,t,a,n){fetch(t,{body:JSON.stringify(e),method:a,cache:"no-cache",credentials:"same-origin",headers:{"user-agent":"Mozilla/4.0 MDN Example","content-type":"application/json"},mode:"cors",redirect:"follow",referrer:"no-referrer"}).then(function(e){return console.log(e)}).then(function(){return n()})},x=function(e){return fetch(e).then(function(e){return e.json()}).then(function(e){var t=e.queryFolder;return e.queryfiles.map(function(e){return{fileName:e,folder:t}})},function(e){console.log(e)})},w=function(e){return fetch(e).then(function(e){return e.json()}).then(function(e){return e},function(e){console.log(e)})},S=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={InputShow:!1},a.renameComponentFile=a.renameComponentFile.bind(Object(O.a)(a)),a.selectToRename=a.selectToRename.bind(Object(O.a)(a)),a.deleteComponentFile=a.deleteComponentFile.bind(Object(O.a)(a)),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"renameComponentFile",value:function(e){var t=this,a=this.props.element[0],n=this.props.element[1],r=n.fileName,i=n.folder;n.fileName=e;var o=function(){t.setState({InputShow:!1}),t.props.updateOBJLeftFile(Object(j.a)({},a,n))};o=o.bind(this);var c={oldfilepath:"".concat(i,"/").concat(r),newfilepath:"".concat(i,"/").concat(e)};k(c,"/renamejsonfile","POST",o)}},{key:"selectedComponentFile",value:function(){var e=Object(v.a)(b.a.mark(function e(t){var a,n;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.props.selectKey(t[0]),a="/".concat(t[1].folder,"/").concat(t[1].fileName),e.next=4,fetch(a).then(function(e){return e.json()},function(e){console.log(e)});case 4:(n=e.sent).fileName=t[1].fileName,n.folder=t[1].folder,this.props.updateCurrentFileDetail(n);case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"selectToRename",value:function(){this.setState({InputShow:!0})}},{key:"deleteComponentFile",value:function(){var e=this;if(window.confirm("Do you want to delete this file")){var t=function(){e.props.deleteOBJLeftFile([e.props.element[0]]),e.props.currentKey===e.props.element[0]&&e.props.recoverCurrentFileDetail()};t.bind(this);var a=this.props.element[1],n={filepath:"".concat(a.folder,"/").concat(a.fileName)};k(n,"/jsonfile","DELETE",t)}}},{key:"render",value:function(){var e=this,t=this.state.InputShow?r.a.createElement(C,{name:"Name",value:this.props.element[1].fileName,updateProps:this.renameComponentFile}):r.a.createElement("li",{className:this.props.currentKey===this.props.element[0]?"list-group-item active":"list-group-item",onClick:function(t){return e.selectedComponentFile(e.props.element)}},this.props.element[1].fileName);return r.a.createElement("div",{className:"row no-gutters align-items-center border border-bottom-0"},r.a.createElement("div",{className:"col-10"},t),r.a.createElement("div",{className:" col-1",style:{cursor:"pointer"},onClick:this.selectToRename},r.a.createElement("i",{className:"fas fa-arrow-right fa-pen"})),r.a.createElement("div",{className:" col-1",style:{cursor:"pointer"},onClick:this.deleteComponentFile},r.a.createElement("i",{className:"fas fa-arrow-right fa-ban"})))}}]),t}(r.a.Component),I=Object(h.b)(null,{updateOBJLeftFile:function(e){return{type:"UPDATE_OBJ_LEFT_FILE",objFile:e}},updateCurrentFileDetail:P,deleteOBJLeftFile:function(e){return{type:"DELETE_OBJ_LEFT_FILE",keysList:e}},recoverCurrentFileDetail:function(){return{type:"RECOVER_CURRENT_FILE_DETAIL",cunrrentFileDetail:{}}}})(S),T=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={currentKey:"",showInputFileName:!1,newFileName:""},a.selectKey=a.selectKey.bind(Object(O.a)(a)),a.createComponentFile=a.createComponentFile.bind(Object(O.a)(a)),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"selectKey",value:function(e){this.setState({currentKey:e})}},{key:"createComponentFile",value:function(e){var t=this;this.setState({showInputFileName:!1});var a={fileName:e,folder:"component"===this.props.currentModel?"./component":"./execution"},n=function(){t.props.addOBJLeftFile({objFile:a,currentIndex:t.props.currentIndex,nextIndex:t.props.currentIndex+1})};n=n.bind(this);var r={};"component"===a.folder&&(r={description:"NEW COMPONENT",actions:[]});var i={filepath:"".concat(a.folder,"/").concat(a.fileName),filedata:r};k(i,"/jsonfile","POST",n)}},{key:"render",value:function(){var e=this,t=this.state.showInputFileName?r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col"},r.a.createElement(C,{name:"Name",value:this.state.newFileName,updateProps:this.createComponentFile}))):r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("button",{type:"button",className:"btn btn-info btn-sm col-11",onClick:function(t){return e.setState({showInputFileName:!e.state.showInputFileName})}},r.a.createElement("span",{className:"fas fa-plus"}," New Component")));return r.a.createElement("div",{className:"col-sm-3 mx-auto border"},r.a.createElement("ul",{className:"list-group list-group-flush"},Object.entries(this.props.objLeftFiles).map(function(t){return r.a.createElement(I,{element:t,key:t[0],currentKey:e.state.currentKey,selectKey:e.selectKey})})),t)}}]),t}(r.a.Component),D=Object(h.b)(function(e){var t=e.ComponentFile;return{objLeftFiles:t.objLeftFiles,currentIndex:t.currentIndex,currentModel:t.currentModel}},{addOBJLeftFile:function(e){return{type:"ADD_OBJ_LEFT_FILE",objFile:Object(j.a)({},e.currentIndex,e.objFile),nextIndex:e.nextIndex}}})(T),L=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={value:a.props.value},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"updateInput",value:function(e){this.setState({value:e}),this.props.updateProps(e)}},{key:"componentWillReceiveProps",value:function(e){this.setState({value:e.value})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"input-group input-group-sm mb-3"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"},this.props.name,":")),r.a.createElement("input",{type:"text",className:"form-control",value:this.state.value,onChange:function(t){return e.updateInput(t.target.value)}}))}}]),t}(r.a.Component),g=["openUrl","input","click","checkbox","verifyText","fileupload","select"],_=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state=Object(y.a)({},a.props),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"updateValue",value:function(e){console.log("stepactiontype: ",this.props),this.setState({type:e}),this.props.updateProps(e)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"dropdown col"},r.a.createElement("button",{className:"btn btn-secondary btn-sm dropdown-toggle",type:"button",id:"dropdownMenu2","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},"ActionType: ",this.state.type),r.a.createElement("div",{className:"dropdown-menu","aria-labelledby":"dropdownMenu2"},g.map(function(t,a){return r.a.createElement("button",{className:"dropdown-item",type:"button",key:a,value:t,onClick:function(t){return e.updateValue(t.target.value)}}," ",t)})))}}]),t}(r.a.Component),A=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={value:a.props.value,updateProps:a.props.updateProps},a.updateValue=a.updateValue.bind(Object(O.a)(a)),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"updateValue",value:function(){var e=!this.state.value;this.setState({value:e}),this.state.updateProps(e)}},{key:"componentWillReceiveProps",value:function(e){this.setState(Object(y.a)({},e))}},{key:"render",value:function(){return r.a.createElement("div",{className:"form-check col-md-auto"},r.a.createElement("input",{className:"form-check-input",type:"checkbox",value:"ddd",id:"defaultCheck1",onChange:this.updateValue,checked:this.state.value}),r.a.createElement("label",{className:"form-check-label",htmlFor:"defaultCheck1"},"frame"))}}]),t}(r.a.Component),R=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).updateActionCreator=a.updateActionCreator.bind(Object(O.a)(a)),a.updateActionType=a.updateActionType.bind(Object(O.a)(a)),a.elementByActionType=a.elementByActionType.bind(Object(O.a)(a)),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"updateActionType",value:function(e){var t=this.props.step;t.actionType=e,this.props.updateProps(this.props.index,t)}},{key:"updateActionCreator",value:function(e){var t=this,a=function(a){var n=Object(y.a)({},t.props.step);n[e]=a,t.props.updateProps(t.props.index,n)};return a=a.bind(this)}},{key:"initStepProps",value:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:"NEW ".concat(t)}},{key:"elementByActionType",value:function(e){switch(e.actionType){case"openUrl":return r.a.createElement("div",null,r.a.createElement(L,{name:"actionParam",value:this.initStepProps(this.props.step,"actionParam"),updateProps:this.updateActionCreator("actionParam")}));case"input":return r.a.createElement("div",null,r.a.createElement(L,{name:"objectXpath",value:this.initStepProps(this.props.step,"objectXpath"),updateProps:this.updateActionCreator("objectXpath")}),r.a.createElement(L,{name:"actionParam",value:this.initStepProps(this.props.step,"actionParam"),updateProps:this.updateActionCreator("actionParam")}));case"click":return r.a.createElement("div",null,r.a.createElement(L,{name:"objectXpath",value:this.initStepProps(this.props.step,"objectXpath"),updateProps:this.updateActionCreator("objectXpath")}));case"checkbox":case"verifyText":case"fileupload":return r.a.createElement("div",null,r.a.createElement(L,{name:"objectXpath",value:this.initStepProps(this.props.step,"objectXpath"),updateProps:this.updateActionCreator("objectXpath")}),r.a.createElement(L,{name:"actionParam",value:this.initStepProps(this.props.step,"actionParam"),updateProps:this.updateActionCreator("actionParam")}));case"select":return r.a.createElement("div",null,r.a.createElement(L,{name:"selectLocator",value:this.initStepProps(this.props.step,"selectLocator"),updateProps:this.updateActionCreator("selectLocator")}),r.a.createElement(L,{name:"actionParam",value:this.initStepProps(this.props.step,"actionParam"),updateProps:this.updateActionCreator("actionParam")}));default:return r.a.createElement("div",null,"Please select actionType")}}},{key:"render",value:function(){return r.a.createElement("div",{className:"col-sm-11 border rounded bg-info"},r.a.createElement("div",{className:"row"},r.a.createElement("b",{className:"col-11"}," STEP",this.props.index+1,":"),r.a.createElement("button",{type:"button",className:"btn btn-info btn-sm col-1",onClick:this.props.deleteActionStep},r.a.createElement("span",{className:"fas fa-ban"}))),r.a.createElement(L,{name:"description",value:this.props.step.description,updateProps:this.updateActionCreator("description")}),r.a.createElement("div",{className:"row"},r.a.createElement(_,{type:this.props.step.actionType,updateProps:this.updateActionCreator("actionType")}),r.a.createElement(A,{value:!!Object.prototype.hasOwnProperty.call(this.props.step,"frameCheckBox")&&this.props.step.frameCheckBox,updateProps:this.updateActionCreator("frameCheckBox")}," ")),this.props.step.frameCheckBox?r.a.createElement("div",null,r.a.createElement(L,{name:"frame",value:Object.prototype.hasOwnProperty.call(this.props.step,"frame")?this.props.step.frame:"new frame",updateProps:this.updateActionCreator("frame")})):"",this.elementByActionType(this.props.step))}}]),t}(r.a.Component),B=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state=Object(y.a)({},a.props.cunrrentFileDetail),a.updateFileDescription=a.updateFileDescription.bind(Object(O.a)(a)),a.updateFileActionStep=a.updateFileActionStep.bind(Object(O.a)(a)),a.createFileActionStep=a.createFileActionStep.bind(Object(O.a)(a)),a.deleteFileActionStep=a.deleteFileActionStep.bind(Object(O.a)(a)),a.saveComponentFile=a.saveComponentFile.bind(Object(O.a)(a)),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"updateFileDescription",value:function(e){this.setState({description:e})}},{key:"updateFileActionStep",value:function(e,t){var a=Object(E.a)(this.state.actions);a.splice(e,1,t),this.setState({actions:Object(E.a)(a)})}},{key:"createFileActionStep",value:function(){var e=Object(E.a)(this.state.actions);e.push({description:"NEW ACTIONSTEP"}),this.setState({actions:Object(E.a)(e)})}},{key:"deleteFileActionStep",value:function(e){var t=Object(E.a)(this.state.actions);t.splice(e,1),this.setState({actions:Object(E.a)(t)})}},{key:"componentWillReceiveProps",value:function(e){this.setState(Object(y.a)({},e.cunrrentFileDetail))}},{key:"filterStep",value:function(e){var t=e.description,a=e.actionType,n={description:t,actionType:a};switch(Object.prototype.hasOwnProperty.call(e,"frame")&&""!==e.frame.trim()&&(n.frame=e.frame),a){case"openUrl":n.actionParam=e.actionParam;break;case"input":n.objectXpath=e.objectXpath,n.actionParam=e.actionParam;break;case"click":n.objectXpath=e.objectXpath;break;case"checkbox":case"verifyText":case"fileupload":n.objectXpath=e.objectXpath,n.actionParam=e.actionParam;break;case"select":n.selectLocator=e.selectLocator,n.actionParam=e.actionParam}return n}},{key:"saveComponentFile",value:function(){var e=this.props.cunrrentFileDetail,t=e.fileName,a=e.folder,n=this.state,r=n.description,i=n.actions,o=function(){};o=o.bind(this);var c={filepath:"".concat(a,"/").concat(t),filedata:{description:r,actions:i.map(this.filterStep)}};k(c,"/jsonfile","POST",o)}},{key:"render",value:function(){var e=this,t=r.a.createElement("button",{type:"button",className:"btn btn-primary btn-sm col-2",onClick:this.saveComponentFile},r.a.createElement("span",{className:"fas fa-save"}," Save")),a=r.a.createElement("button",{type:"button",className:"btn btn-primary btn-sm col-2",onClick:this.createFileActionStep},r.a.createElement("span",{className:"fas fa-plus"}," New Step")),n=Object.prototype.hasOwnProperty.call(this.state,"actions")?this.state.actions.map(function(t,a){return r.a.createElement("div",{key:a},r.a.createElement(R,{step:t,index:a,updateProps:e.updateFileActionStep,deleteActionStep:function(){return e.deleteFileActionStep(a)}}))}):r.a.createElement("div",null);return r.a.createElement("div",{className:"col-sm-6 auto-mx border"},"Component Detail",this.props.cunrrentFileDetail.description?r.a.createElement("div",null,r.a.createElement(L,{name:"description",value:this.state.description,updateProps:this.updateFileDescription}),n,r.a.createElement("div",{className:"row justify-content-around"},a,t)):"")}}]),t}(r.a.Component),K=Object(h.b)(function(e){return{cunrrentFileDetail:e.ComponentFile.cunrrentFileDetail}},{updateCurrentFileDetail:P})(B),U=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).initLeftFilesList(),a.props.changeModule("component"),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"initLeftFilesList",value:function(){var e=Object(v.a)(b.a.mark(function e(){var t;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x("/components");case 2:t=e.sent,this.props.initOBJLeftFiles(t);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("main",{role:"main"},r.a.createElement("div",{className:"col-sm-12 mx-auto"},r.a.createElement("div",{className:"row flex-xl-nowrap"},r.a.createElement(D,null),r.a.createElement(K,null),r.a.createElement("div",{className:"col-sm-3 mx-auto border"}))))}}]),t}(r.a.Component),J=Object(h.b)(function(e){var t=e.ComponentFile;return{objLeftFiles:t.objLeftFiles,currentIndex:t.currentIndex}},{changeModule:N,initOBJLeftFiles:F})(U),M=a(22),X=a.n(M),W=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={showParm:!1,parmDetail:{}},a.parmShowOff=a.parmShowOff.bind(Object(O.a)(a)),a.parmShowOn=a.parmShowOn.bind(Object(O.a)(a)),a.creator4UpdateParms=a.creator4UpdateParms.bind(Object(O.a)(a)),a.deleteParms=a.deleteParms.bind(Object(O.a)(a)),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillReceiveProps",value:function(){this.setState({showParm:!1,parmDetail:{}})}},{key:"parmShowOn",value:function(){var e=Object(v.a)(b.a.mark(function e(){var t,a,n;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!Object.prototype.hasOwnProperty.call(this.state.parmDetail,"ukey")){e.next=4;break}this.setState({showParm:!0}),e.next=13;break;case 4:return t={ukey:this.props.executionStep[1].ukey,component:this.props.executionStep[1].component,parms:{}},e.next=7,this.getParmsKey(t.component);case 7:return a=e.sent,e.next=10,this.getparmObj(t.ukey);case 10:(n=e.sent)?a.forEach(function(e){Object.prototype.hasOwnProperty.call(n,e)?t.parms[e]=n[e]:t.parms[e]="new parm"}):a.forEach(function(e){t.parms[e]="new parm"}),this.setState({showParm:!0,parmDetail:t});case 13:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getParmsKey",value:function(){var e=Object(v.a)(b.a.mark(function e(t){var a,n,r;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=-1===t.indexOf(".json")?"/component/".concat(t,".json"):"/component/".concat(t),e.next=3,w(a);case 3:return n=e.sent,r=[],n.actions.forEach(function(e){for(var t in e)if("actionParam"===t&&r.push(e[t]),"objectParams"===t){var a=e[t];for(var n in a)r.push(a[n])}}),e.abrupt("return",r);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},{key:"getparmObj",value:function(){var e=Object(v.a)(b.a.mark(function e(t){var a,n;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w("/paramfile");case 2:return a=e.sent,n=a.paramfile,e.abrupt("return",n[t]);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},{key:"parmShowOff",value:function(){this.setState({showParm:!1})}},{key:"creator4UpdateParms",value:function(e){var t=this,a=function(a){t.setState({parmDetail:Object(y.a)({},t.state.parmDetail,{parms:Object(y.a)({},t.state.parmDetail.parms,Object(j.a)({},e,a))})},function(){t.props.putParm(t.state.parmDetail.ukey,t.state.parmDetail.parms)})};return a=a.bind(this)}},{key:"deleteParms",value:function(){this.props.delParm(this.state.parmDetail.ukey),this.props.deleteComponentInCurrentFile(this.props.executionStep[0])}},{key:"render",value:function(){var e=this,t=this.state.showParm?r.a.createElement("div",{className:"col border rounded"},r.a.createElement("div",{className:"row align-items-center  "},r.a.createElement("div",{className:"col"},Object.keys(this.state.parmDetail.parms).map(function(t){return r.a.createElement("div",{key:t},r.a.createElement(C,{name:t,value:e.state.parmDetail.parms[t],updateProps:e.creator4UpdateParms(t)}))}))),r.a.createElement("div",{className:"row align-items-center "},r.a.createElement("button",{type:"button",className:"btn btn-sm col-1",onClick:this.parmShowOff},r.a.createElement("span",{className:"fas fa-minus"})))):"";return r.a.createElement("div",{className:"col-sm-11 "},r.a.createElement("div",{className:"row no-gutters align-items-center border rounded "},r.a.createElement("button",{type:"button",className:"btn btn-sm col-1",onClick:this.parmShowOn},r.a.createElement("span",{className:"fas fa-plus"})),r.a.createElement("b",{className:"col-2"}," Case",this.props.index+1,": "),r.a.createElement("div",{className:"col-8"}," ",this.props.executionStep[1].component),r.a.createElement("button",{type:"button",className:"btn btn-sm col-1",onClick:this.deleteParms},r.a.createElement("span",{className:"fas fa-ban"}))),t)}}]),t}(r.a.Component),V=Object(h.b)(null,{deleteComponentInCurrentFile:function(e){return{type:"DELETE_COMPONENT_IN_CURRENT_FILE",delKey:Object(E.a)(e)}}})(W),H=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={executionStep:a.filterComponent(a.props.cunrrentFileDetail),deleteParmKey:[]},a.putParm=a.putParm.bind(Object(O.a)(a)),a.deleteParm=a.deleteParm.bind(Object(O.a)(a)),a.saveComponentFile=a.saveComponentFile.bind(Object(O.a)(a)),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.cunrrentFileDetail.fileName===this.props.cunrrentFileDetail.fileName?this.setState({executionStep:this.filterComponent(e.cunrrentFileDetail)}):this.setState({executionStep:this.filterComponent(e.cunrrentFileDetail),deleteParmKey:[],actionParam:{}})}},{key:"filterComponent",value:function(e){var t=Object.entries(e).filter(function(e){return"fileName"!==e[0]&&"folder"!==e[0]});return t.sort(function(e,t){return e[1].index<t[1].index?-1:e[1].index>t[1].index?1:0}),t}},{key:"putParm",value:function(e,t){this.setState({actionParam:Object(y.a)({},this.state.actionParam,Object(j.a)({},e,Object(y.a)({},t)))})}},{key:"deleteParm",value:function(e){this.setState({actionParam:X.a.omit(this.state.actionParam,[e]),deleteParmKey:[].concat(Object(E.a)(this.state.deleteParmKey),[e])})}},{key:"saveComponentFile",value:function(){var e=this.props.cunrrentFileDetail,t=e.fileName,a=e.folder,n=[];Object.keys(e).forEach(function(t){"fileName"!==t&&"folder"!==t&&n.push(e[t])});var r=function(){};r=r.bind(this);var i={filepath:"".concat(a,"/").concat(t),filedata:n};k(i,"/jsonfile","POST",r);var o=this.state,c=o.actionParam,s=o.deleteParmKey;k({filepath:"./execution/param.json",filedata:{parmJson:c,deleteKey:s}},"/jsonfile4parm","POST",r)}},{key:"render",value:function(){var e=this,t=this.state.executionStep.map(function(t,a){return r.a.createElement(V,{key:a,index:a,putParm:e.putParm,delParm:e.deleteParm,executionStep:t})}),a="";return Object.prototype.hasOwnProperty.call(this.props.cunrrentFileDetail,"fileName")&&(a=r.a.createElement("button",{type:"button",className:"btn btn-primary btn-sm col-2",onClick:this.saveComponentFile},r.a.createElement("span",{className:"fas fa-save"}," Save"))),r.a.createElement("div",{className:"col-sm-6 auto-mx border"},"Execution Detail",t,r.a.createElement("div",{className:"row justify-content-around"},a))}}]),t}(r.a.Component),G=Object(h.b)(function(e){return{cunrrentFileDetail:e.ComponentFile.cunrrentFileDetail}})(H),q=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={nextKey:0,nextIndex:1},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentWillReceiveProps",value:function(e){var t=this.filterComponent(e.cunrrentFileDetail),a=0,n=1;t&&t.length>0&&t.every(function(e){return Object.prototype.hasOwnProperty.call(e[1],"index")})&&(n=t[(a=t.length)-1][1].index+1),this.setState({nextKey:a,nextIndex:n}),this.addNewComponent=this.addNewComponent.bind(this)}},{key:"filterComponent",value:function(e){var t=Object.entries(e).filter(function(e){return"fileName"!==e[0]&&"folder"!==e[0]});return t.sort(function(e,t){return e[1].index<t[1].index?-1:e[1].index>t[1].index?1:0}),t}},{key:"addNewComponent",value:function(){var e=Object(v.a)(b.a.mark(function e(t){var a,n,r,i,o;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!Object.prototype.hasOwnProperty.call(this.props.cunrrentFileDetail,"fileName")){e.next=9;break}return a=this.state,n=a.nextKey,r=a.nextIndex,"/ukey8length",e.next=5,w("/ukey8length");case 5:i=e.sent,o={component:t,index:r,ukey:i.uKey},this.props.addComponentInCurrentFile(n,o),this.setState({nextKey:n+1,nextIndex:r+1});case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getUKey",value:function(){var e=Object(v.a)(b.a.mark(function e(t){var a;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(t);case 2:return a=e.sent,e.abrupt("return",a.uKey);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"col-sm-3 mx-auto border"},r.a.createElement("ul",{className:"list-group list-group-flush"},Object.entries(this.props.objRightFiles).map(function(t,a){return r.a.createElement("div",{key:a,className:"row  align-items-center border border-left-0 border-botton-0"},r.a.createElement("div",{className:" col-1",style:{cursor:"pointer"},onClick:function(){e.addNewComponent(t[1].fileName)}},r.a.createElement("i",{className:"fas fa-arrow-left"})),r.a.createElement("li",{className:"list-group-item"},t[1].fileName))})))}}]),t}(r.a.Component),Y=Object(h.b)(function(e){var t=e.ComponentFile;return{objRightFiles:t.objRightFiles,cunrrentFileDetail:t.cunrrentFileDetail}},{addComponentInCurrentFile:function(e,t){return{type:"ADD_COMPONENT_IN_CURRENT_FILE",newComponent:Object(j.a)({},e,t)}}})(q),z=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).initFilesList(),a.props.changeModule("execution"),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"initFilesList",value:function(){var e=Object(v.a)(b.a.mark(function e(){var t,a;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x("/executions");case 2:return t=e.sent,this.props.initOBJLeftFiles(t),e.next=6,x("/components");case 6:a=e.sent,this.props.initOBJRightFiles(a);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("main",{role:"main"},r.a.createElement("div",{className:"col-sm-12 mx-auto"},r.a.createElement("div",{className:"row flex-xl-nowrap"},r.a.createElement(D,null),r.a.createElement(G,null),r.a.createElement(Y,null))))}}]),t}(r.a.Component),$=Object(h.b)(function(e){var t=e.ComponentFile;return{objLeftFiles:t.objLeftFiles,currentIndex:t.currentIndex,objRightFiles:t.objRightFiles}},{changeModule:N,initOBJLeftFiles:F,initOBJRightFiles:function(e){return{type:"INIT_OBJ_RIGHT_FILES",objFiles:Object(E.a)(e)}}})(z),Q=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(m.a,null,r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-info rounded"},r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarText"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(m.b,{to:"/",className:"component"===this.props.currentModel?"nav-link active":"nav-link"},"Home")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(m.b,{to:"/EXECUTIONPART",className:"execution"===this.props.currentModel?"nav-link active":"nav-link"},"Execution"))))),r.a.createElement(d.a,{path:"/",exact:!0,component:J}),r.a.createElement(d.a,{path:"/EXECUTIONPART",exact:!0,component:$}))}}]),t}(r.a.Component),Z=Object(h.b)(function(e){return{currentModel:e.ComponentFile.currentModel}})(Q);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ee=a(19),te=a(34),ae={objLeftFiles:{},objRightFiles:{},componentFiles:{},executionFiles:{},cunrrentFileDetail:{},currentModel:"component",currentIndex:""},ne=Object(ee.c)({ComponentFile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT_OBJ_LEFT_FILES":return Object(y.a)({},e,{objLeftFiles:Object(y.a)({},t.objFiles),currentIndex:Object.keys(t.objFiles).length});case"ADD_OBJ_LEFT_FILE":return Object(y.a)({},e,{objLeftFiles:Object(y.a)({},e.objLeftFiles,t.objFile),currentIndex:t.nextIndex});case"UPDATE_OBJ_LEFT_FILE":return Object(y.a)({},e,{objLeftFiles:Object(y.a)({},e.objLeftFiles,t.objFile)});case"DELETE_OBJ_LEFT_FILE":return Object(y.a)({},e,{objLeftFiles:X.a.omit(e.objLeftFiles,t.keysList)});case"INIT_OBJ_RIGHT_FILES":return Object(y.a)({},e,{objRightFiles:Object(y.a)({},t.objFiles)});case"RECOVER_OBJ_RIGHT_FILES":return Object(y.a)({},e,{objRightFiles:{}});case"UPDATE_CURRENT_FILE_DETAIL":return Object(y.a)({},e,{cunrrentFileDetail:Object(y.a)({},t.cunrrentFileDetail)});case"RECOVER_CURRENT_FILE_DETAIL":return Object(y.a)({},e,{cunrrentFileDetail:{}});case"CHANGE_MODULE_TYPE":return Object(y.a)({},e,{currentModel:t.currentModel});case"ADD_COMPONENT_IN_CURRENT_FILE":case"UPDATE_COMPONENT_IN_CURRENT_FILE":return Object(y.a)({},e,{cunrrentFileDetail:Object(y.a)({},e.cunrrentFileDetail,t.newComponent)});case"DELETE_COMPONENT_IN_CURRENT_FILE":return Object(y.a)({},e,{cunrrentFileDetail:X.a.omit(e.cunrrentFileDetail,t.delKey)});default:return e}}}),re=Object(ee.d)(ne,Object(ee.a)(te.a));o.a.render(r.a.createElement(h.a,{store:re},r.a.createElement(Z,null),","),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[35,1,2]]]);
//# sourceMappingURL=main.d7b3d3d6.chunk.js.map