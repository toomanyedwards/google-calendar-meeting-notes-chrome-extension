(this["webpackJsonpgoogle-calendar-meeting-notes-chrome-extension"]=this["webpackJsonpgoogle-calendar-meeting-notes-chrome-extension"]||[]).push([[0],{101:function(e,t,n){},109:function(e,t,n){},110:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(9),i=n.n(r),l=(n(101),n(69)),c=n(15),s=n.n(c),d=n(26),u=n(11),m=n(75),g=n(160),f=n(152),p=n(163),v=n(151),b=n(149),h=n(150),E=n(148),y=n(158),N=n(157),O=n(161),S=n(165);function T(e){var t=e.open,n=e.onClose,a=e.title,r=void 0===a?"Error":a,i=e.errors;return o.a.createElement(p.a,{open:t,onClose:n,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},o.a.createElement(E.a,{id:"alert-dialog-title"},r),o.a.createElement(b.a,null,i.map((function(e){return o.a.createElement(h.a,{id:"alert-dialog-description"},e.message)}))),o.a.createElement(v.a,null,o.a.createElement(f.a,{onClick:n,color:"primary",autoFocus:!0},"OK")))}var x=n(79),I=n(153),C=n(154),j=n(167),D=n(155),M=n(58),w=n(71),k=n.n(w),A=n(70),_=n.n(A),L=Object(I.a)((function(e){return{content:{color:e.palette.text.secondary,borderTopRightRadius:e.spacing(2),borderBottomRightRadius:e.spacing(2),paddingRight:e.spacing(1),fontWeight:e.typography.fontWeightMedium,"$expanded > &":{fontWeight:e.typography.fontWeightRegular}},expanded:{},label:{fontWeight:"inherit",color:"inherit"},labelRoot:{display:"flex",alignItems:"center",padding:e.spacing(.5,0)},labelIcon:{marginRight:e.spacing(1)},labelText:{fontWeight:"inherit",flexGrow:1}}})),R=function(e){var t=L(),n=e.labelText,a=e.labelIcon,r=e.labelInfo,i=e.color,l=e.bgColor,c=Object(x.a)(e,["labelText","labelIcon","labelInfo","color","bgColor"]);return o.a.createElement(j.a,Object.assign({label:o.a.createElement("div",{className:t.labelRoot},o.a.createElement(a,{color:"inherit",className:t.labelIcon}),o.a.createElement(M.a,{variant:"body2",className:t.labelText},n),o.a.createElement(M.a,{variant:"caption",color:"inherit"},r)),style:{"--tree-view-color":i,"--tree-view-bg-color":l},classes:{root:t.root,content:t.content,expanded:t.expanded,group:t.group,label:t.label}},c))},G=function(e){var t=e.loadChildNodes,n=e.onSelectionChanged,r=e.allowParentNodeSelection,i=void 0!==r&&r,l=e.onErrors,c="LazyTreeView_root",m=Object(a.useState)({nodeIdToNodeMap:(new Map).set(c,{id:c,name:c,mayHaveChildren:!0})}),g=Object(u.a)(m,2),f=g[0],p=g[1],v=o.a.useState([]),b=Object(u.a)(v,2),h=b[0],E=b[1],y=o.a.useState(""),N=Object(u.a)(y,2),O=N[0],S=N[1],T=Object(a.useState)([]),x=Object(u.a)(T,2),I=x[0],j=x[1],M=function(e){return f.nodeIdToNodeMap.get(e)},w=function(){return M(c).childrenLoaded};Object(a.useEffect)((function(){function e(){return(e=Object(d.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(w()){e.next=3;break}return e.next=3,L(c);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var A=function(e){j(e),l(e)},L=function(){var e=Object(d.a)(s.a.mark((function e(n){var a,o,r,i,l;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n!==c){e.next=7;break}return e.next=4,t();case 4:e.t0=e.sent,e.next=10;break;case 7:return e.next=9,t(n);case 9:e.t0=e.sent;case 10:a=e.t0,e.next=18;break;case 13:return e.prev=13,e.t1=e.catch(0),console.log("LazyTreeView: addNodeChildren: Errors: ".concat(JSON.stringify(e.t1))),A(e.t1),e.abrupt("return");case 18:return(o=M(n)).childrenLoaded=!0,(r=new Map(f.nodeIdToNodeMap)).set(n,o),i=[],a.map((function(e){r.set(e.id,e),i.push(e.id)})),(l=new Map(f.nodeIdToChildNodeIdsMap)).set(n,i),p({nodeIdToNodeMap:r,nodeIdToChildNodeIdsMap:l}),e.abrupt("return",a);case 28:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}();return w()?o.a.createElement(D.a,{defaultCollapseIcon:o.a.createElement(_.a,null),defaultExpandIcon:o.a.createElement(k.a,null),onNodeToggle:function(e,t){if(!i||e.target.closest(".MuiTreeItem-iconContainer")){var n=t.filter((function(e){return!h.includes(e)}));if(E(t),n[0]){var a=n[0];M(a).childrenLoaded||L(a)}}},onNodeSelect:function(e,t){var a=M(t);i&&e.target.closest(".MuiTreeItem-iconContainer")||a.mayHaveChildren&&!i||(O===t?(S(""),n(null)):(S(t),n(a)))},expanded:h,selected:O},function e(t){if(!w())return null;var n,a=M(t);if(a.mayHaveChildren)if(a.childrenLoaded){var r=function(e){return f.nodeIdToChildNodeIdsMap.get(e)}(t);n=Array.isArray(r)?r.map((function(t){return e(t)})):null}else n=o.a.createElement("div",null,"Loading...");return t===c?n:o.a.createElement(R,{labelIcon:a.icon,key:t,nodeId:t,labelText:a.name},n)}(c)):0===I.length?o.a.createElement("div",{style:{position:"relative",display:"flex",width:"100%",justifyContent:"center"}},o.a.createElement(C.a,null)):o.a.createElement("div",null)},J=n(73),P=n.n(J),B=n(72),W=n.n(B),F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"root",t=arguments.length>1?arguments[1]:void 0;console.log("listGoogleDrive: folderId: ".concat(e," mimeTypes: ").concat(JSON.stringify(t)));var n=t&&0!=t.length?"mimeType='"+t.join("' or mimeType='")+"' ":"";console.log("listGoogleDrive: mimeTypeQuery: ".concat(n));var a="'".concat(e,"' in parents and trashed=false")+(t?" and (".concat(n,")"):"");return console.log("listGoogleDrive: query: ".concat(JSON.stringify(a))),new Promise((function(e,t){chrome.runtime.sendMessage({type:"listGoogleDrive",listParams:{orderBy:"folder, name",q:a,fields:"nextPageToken, files(id, name, mimeType)"}},(function(n){if(n.filesList)e(n.filesList);else{var a=n.errors;console.log("listGoogleDrive errors: ".concat(JSON.stringify(a))),t(a)}e(n)}))}))},z=function(e){var t=e.onSelectionChanged,n=e.allowFolderSelection,r=void 0!==n&&n,i=e.fileMimeTypes,l=void 0===i?[]:i,c=e.onErrors,m=Object(a.useState)([]),g=Object(u.a)(m,2),f=g[0],p=g[1],v="application/vnd.google-apps.folder",b=[v].concat(l),h=function(){var e=Object(d.a)(s.a.mark((function e(){var t,n,a=arguments;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:"root",e.next=3,F(t,b);case 3:return n=e.sent,e.abrupt("return",n.map((function(e){var t=e.mimeType===v;return{id:e.id,name:e.name,icon:t?W.a:P.a,mayHaveChildren:t}})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return 0!=f.length?o.a.createElement("div",null):o.a.createElement(G,{open:!0,onSelectionChanged:t,loadChildNodes:h,allowParentNodeSelection:r,onErrors:function(e){console.log("GoogleDriveTreeControl: errors: ".concat(JSON.stringify(e),"}")),p(e),c(e)}})},H=function(e){var t=e.open,n=e.setOpen,a=e.onSelectionConfirmed,r=e.title,i=e.allowFolderSelection,l=void 0!==i&&i,c=e.fileMimeTypes,s=void 0===c?[]:c,d=o.a.useState(null),m=Object(u.a)(d,2),g=m[0],h=m[1],y=o.a.useState([]),N=Object(u.a)(y,2),O=N[0],S=N[1];return o.a.createElement("div",null,o.a.createElement(T,{open:0!=O.length,title:"Error Selecting From Google Drive",errors:O,onClose:function(){n(!1),S([])}}),o.a.createElement(p.a,{maxWidth:"lg",open:t,"aria-labelledby":"form-dialog-title"},o.a.createElement(E.a,{id:"form-dialog-title"},r),o.a.createElement(b.a,null,o.a.createElement(z,{id:"1",name:"Applications",open:t,onSelectionChanged:function(e){console.log("onSelectionChanged: ".concat(JSON.stringify(e))),h(e)},allowFolderSelection:l,fileMimeTypes:s,onErrors:function(e){console.log("SelectGoogleDriveResourceDialog: errors: ".concat(e.toString())),e.map((function(e){console.log("SelectGoogleDriveResourceDialog: error: ".concat(e.toString()))})),S([{message:"Error reading drive"}])}})),o.a.createElement(v.a,null,o.a.createElement(f.a,{onClick:function(){n(!1)},color:"primary"},"Cancel"),o.a.createElement(f.a,{onClick:function(){a({id:g.id,name:g.name}),n(!1)},disabled:!g,color:"primary"},"Select"))))},q=n(159),U=n(164),V=function(e){var t=e.userDomain,n=e.defaultSharingLevel,r=e.defaultNotesTemplateInfo,i=e.defaultNotesDestinationInfo,l=e.open,c=e.setOpen,s=e.addMeetingNotes,d=Object(a.useState)(!1),m=Object(u.a)(d,2),T=m[0],x=m[1],I=Object(a.useState)(!1),C=Object(u.a)(I,2),j=C[0],D=C[1],M=Object(a.useState)(""),w=Object(u.a)(M,2),k=w[0],A=w[1],_=Object(a.useState)(null),L=Object(u.a)(_,2),R=L[0],G=L[1],J=Object(a.useState)(null),P=Object(u.a)(J,2),B=P[0],W=P[1];Object(a.useEffect)((function(){A(n)}),[n]),Object(a.useEffect)((function(){G(r)}),[r]),Object(a.useEffect)((function(){W(i)}),[i]);return o.a.createElement("div",null,o.a.createElement(H,{open:T,setOpen:x,onSelectionConfirmed:function(e){G(e),console.log("handleNotesTemplateSelected: ".concat(JSON.stringify(e)))},fileMimeTypes:["application/vnd.google-apps.document"],title:"Select a Notes Template File"}),o.a.createElement(H,{open:j,setOpen:D,onSelectionConfirmed:function(e){W(e),console.log("handleNotesDestinationSelected: ".concat(JSON.stringify(e)))},title:"Select a Notes Destination Folder",allowFolderSelection:!0}),o.a.createElement(p.a,{open:l,"aria-labelledby":"form-dialog-title",fullWidth:!0,maxWidth:"xs"},o.a.createElement(E.a,{id:"form-dialog-title"},"Add Meeting Notes"),o.a.createElement(b.a,null,o.a.createElement(h.a,null,"Notes Template:"),o.a.createElement(U.a,{title:R?R.name:"<Click to select>"},o.a.createElement(q.a,{id:"notesTemplate",size:"medium",fullWidth:!0,value:R?R.name:"<Click to select>",variant:"outlined",InputProps:{readOnly:!0},onClick:function(){x(!0)}})),o.a.createElement(g.a,{my:3},o.a.createElement(h.a,null,"Notes Destination:"),o.a.createElement(q.a,{id:"notesDestination",variant:"outlined",value:B?B.name:"<Click to select>",fullWidth:!0,InputProps:{readOnly:!0},onClick:function(){D(!0)}})),o.a.createElement(g.a,{my:2},o.a.createElement(N.a,{component:"legend"},"Sharing"),o.a.createElement(S.a,{size:"small","aria-label":"sharing",name:"sharing",onChange:function(e){A(e.target.value)},value:k},o.a.createElement(y.a,{value:"private",control:o.a.createElement(O.a,{size:"small"}),label:"Private"}),o.a.createElement(g.a,{my:-1},o.a.createElement(y.a,{value:"domain",control:o.a.createElement(O.a,{size:"small"}),label:"Domain (".concat(t,")")})),o.a.createElement(y.a,{value:"public",control:o.a.createElement(O.a,{size:"small"}),label:"Public"})))),o.a.createElement(v.a,null,o.a.createElement(f.a,{onClick:function(){c(!1)},color:"primary"},"Cancel"),o.a.createElement(f.a,{disabled:!R||!B,onClick:function(){s({sharing:{sharingLevel:k,userDomain:t},notesTemplateInfo:R,notesDestinationInfo:B})},color:"primary"},"Add Notes"))))},Y=function(e){var t=e.open;return o.a.createElement(p.a,{maxWidth:"lg",open:t,"aria-labelledby":"form-dialog-title"},o.a.createElement(b.a,null,o.a.createElement(h.a,{id:"alert-dialog-description"},"Adding meeting notes..."),o.a.createElement("div",{style:{position:"relative",display:"flex",width:"100%",justifyContent:"center"}},o.a.createElement(C.a,null))))},K=function(e){return new Promise((function(t){chrome.storage.sync.get(e,(function(e){console.log("getChromeStorageSyncData get: ".concat(JSON.stringify(e))),t(e)}))}))},Q=function(e){return new Promise((function(t){chrome.storage.sync.set(e,(function(){console.log("Data set: ".concat(e)),t()}))}))};function $(){var e=Object(l.a)(['\n    display: inline-block;\n    color: rgb(255, 255, 255);\n    background-color: rgb(14, 114, 237);\n    line-height: 36px;\n    font-family: "Google Sans", Roboto, Helvetica, Arial, sans-serif;\n    font-weight: 500;\n    font-size: 14px;\n    border-width: 0px;\n    border-style: initial;\n    border-color: initial;\n    border-image: initial;\n    padding: 0px 16px;\n    border-radius: 4px;\n\n\n    &:hover {\n        background-color: rgb(66, 133, 244);\n        cursor: pointer;\n      }\n\n    &:disabled {\n        background-color: grey;\n    }\n']);return $=function(){return e},e}var X=function(){var e=function(){var e=document.querySelectorAll("div[jsname='V67aGc']");if(e&&e[0])return console.log("foo: ".concat(JSON.stringify(e[0]))),e[0]}();e&&(console.log("addDescriptionDiv: ".concat(e)),e.remove())},Z=function(e,t){X(),e.insertAdjacentHTML("afterbegin","<div>Meeting Notes: <a id='foo' href='".concat(t,"&meetingNotesExt='true'>").concat(t,"</a><div>"))},ee=Object(m.a)((function(e){var t=e.className,n=e.userDomain,r=e.meetingDescriptionEl,i=e.getMeetingTitle,l=o.a.useState(!1),c=Object(u.a)(l,2),m=c[0],g=c[1],f=o.a.useState([]),p=Object(u.a)(f,2),v=p[0],b=p[1],h=o.a.useState(!1),E=Object(u.a)(h,2),y=E[0],N=E[1],O=o.a.useState(!1),S=Object(u.a)(O,2),x=S[0],I=S[1],C=o.a.useState({}),j=Object(u.a)(C,2),D=j[0],M=j[1];Object(a.useEffect)((function(){(function(){var e=Object(d.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K();case 2:(t=e.sent).sharing?M(t):M({sharing:{sharingLevel:"private",userDomain:n}});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var w=function(){var e=Object(d.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("openAddMeetingNotesDialog 1"),g(!0);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(e){var t=e.sharing,n=e.notesTemplateInfo,a=e.notesDestinationInfo,o=i();return new Promise((function(e,i){chrome.runtime.sendMessage({type:"addNotes",meetingNotesTitle:o+" Notes",meetingNotesTemplate:n,meetingNotesFolder:a,meetingNotesSharing:t},(function(t){if(console.log("addMeetingNotesButton clicked response",t),t.meetingNotesDocUrl)Z(r,t.meetingNotesDocUrl);else{var n=t.errors;console.log("addMeetingNotes errors: ".concat(JSON.stringify(n))),n.map((function(e){console.log("addMeetingNotes errors foo: ".concat(e.toString()))})),i(n)}e(t)}))}))},A=function(){var e=Object(d.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("handleAddMeetingNotes 1"),g(!1),console.log("handleAddMeetingNotes 2"),I(!0),console.log("handleAddMeetingNotes 3"),e.prev=5,e.next=8,k(t);case 8:Q(t),e.next=19;break;case 11:e.prev=11,e.t0=e.catch(5),b(e.t0),console.log("handleAddMeetingNotes errors: ".concat(JSON.stringify(e.t0))),I(!1),console.log("handleAddMeetingNotes 2"),N(!0),console.log("handleAddMeetingNotes 3");case 19:return e.prev=19,I(!1),e.finish(19);case 22:case"end":return e.stop()}}),e,null,[[5,11,19,22]])})));return function(t){return e.apply(this,arguments)}}();return o.a.createElement("div",null,o.a.createElement("button",{id:"add_meeting_notes_button",onClick:w,class:t},"Add Meeting Notes"),o.a.createElement(Y,{open:x}),o.a.createElement(T,{title:"Error creating meeting notes",open:y,onClose:function(){N(!1)},errors:v}),o.a.createElement(V,{defaultSharingLevel:D.sharing?D.sharing.sharingLevel:"",defaultNotesTemplateInfo:D.notesTemplateInfo,defaultNotesDestinationInfo:D.notesDestinationInfo,userDomain:n,open:m,setOpen:g,addMeetingNotes:A}))}))($()),te=function(e){return o.a.createElement("div",{id:e.buttonContainerId,class:"FrSOzf"},o.a.createElement("div",{"aria-hidden":"true",class:"tzcF6"},o.a.createElement("span",{class:"DPvwYc uSx8Od","aria-hidden":"true"},o.a.createElement("div",null,o.a.createElement("img",{alt:"","aria-hidden":"true",src:chrome.runtime.getURL("google-doc-128.png"),class:"I6gAld"})))),o.a.createElement("div",{class:"j3nyw"},o.a.createElement(ee,e)))},ne=(n(109),function(e){return o.a.createElement(te,e)}),ae=function(){return document.getElementById("meeting_notes_button_container_react_injection_el")},oe=function(){var e=document.getElementById("xOrgEmail").textContent;return e.substring(e.lastIndexOf("@")+1)},re=function(){return document.getElementById("ADD_MEETING_NOTES_BUTTON_CONTAINER_ID")},ie=function(){var e=document.querySelectorAll("a[href*='meetingNotesExt']");return!(!e||!e[0])},le=function(){return document.getElementById("xTiIn").getAttribute("data-initial-value")},ce=new MutationObserver((function(e){e.forEach((function(){var e,t=function(){var e=document.querySelectorAll("div[id*='T2Ybvb']");if(e&&e[0])return e[0]}();if(ae())ie()&&se()?de():ie()||se()||ue();else{var n=document.getElementById("tabEventDetails");if(n&&t){console.log("domain: ".concat(oe()));e=n,console.log("insertMeetingNotesButtonContainerReactInjectionEl"),e.insertAdjacentHTML("afterbegin","<div id='".concat("meeting_notes_button_container_react_injection_el","'/>"));!function(e,t){i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(ne,{meetingDescriptionEl:t,userDomain:oe(),getMeetingTitle:le,buttonContainerId:"ADD_MEETING_NOTES_BUTTON_CONTAINER_ID"})),e)}(ae(),t)}}}))})),se=function(){return"none"!=re().style.display},de=function(){re().style.display="none"},ue=function(){re().style.display=""};window.addEventListener("keydown",(function(e){27===e.keyCode&&(e.preventDefault(),e.stopImmediatePropagation(),e.cancelBubble=!0)}),!0);var me=document.querySelector("body");ce.observe(me,{childList:!0,subtree:!0})},96:function(e,t,n){e.exports=n(110)}},[[96,1,2]]]);
//# sourceMappingURL=main.chunk.js.map