import{S as t,i as e,s as a,M as l,e as s,c as r,a as n,d as c,b as o,f as d,D as h,I as x,t as m,k as u,g as i,n as f,l as p,O as g}from"../../chunks/vendor-b8121f66.js";import{s as b}from"../../chunks/db-5f8a65bd.js";function k(t,e,a){const l=t.slice();return l[3]=e[a],l}function v(t){return{c:x,l:x,m:x,p:x,d:x}}function w(t){let e,a=t[2].data,l=[];for(let s=0;s<a.length;s+=1)l[s]=y(k(t,a,s));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=p()},l(t){for(let e=0;e<l.length;e+=1)l[e].l(t);e=p()},m(t,a){for(let e=0;e<l.length;e+=1)l[e].m(t,a);d(t,e,a)},p(t,s){if(1&s){let r;for(a=t[2].data,r=0;r<a.length;r+=1){const n=k(t,a,r);l[r]?l[r].p(n,s):(l[r]=y(n),l[r].c(),l[r].m(e.parentNode,e))}for(;r<l.length;r+=1)l[r].d(1);l.length=a.length}},d(t){g(l,t),t&&c(e)}}}function y(t){let e,a,l,p,g,b,k,v,w=t[3].date+"",y=t[3].topic+"",E=t[3].content+"";return{c(){e=s("p"),a=m(w),l=u(),p=s("h1"),g=m(y),b=u(),k=s("p"),v=m(E),this.h()},l(t){e=r(t,"P",{class:!0});var s=n(e);a=i(s,w),s.forEach(c),l=f(t),p=r(t,"H1",{class:!0});var o=n(p);g=i(o,y),o.forEach(c),b=f(t),k=r(t,"P",{class:!0});var d=n(k);v=i(d,E),d.forEach(c),this.h()},h(){o(e,"class","px-1.5 py-0.5 text-white dark:text-gray-800 m-2 w-max opacity-80 text-base sm:text-lg ml-auto sm:rounded-lg rounded-md"),o(p,"class","p-3 pl-1 mb-2 ml-1 text-3xl font-thin text-gray-900 border shadow-xl sm:text-5xl md:text-7xl sm:ml-3 rounded-xl max-w-max dark:text-cyan-900"),o(k,"class","p-3 mb-3 text-base text-white sm:text-xl")},m(t,s){d(t,e,s),h(e,a),d(t,l,s),d(t,p,s),h(p,g),d(t,b,s),d(t,k,s),h(k,v)},p:x,d(t){t&&c(e),t&&c(l),t&&c(p),t&&c(b),t&&c(k)}}}function E(t){let e,a,l,p,g,b,k,v;return{c(){e=s("p"),a=m("DD/MM/YYYY"),l=u(),p=s("h1"),g=m("topic"),b=u(),k=s("p"),v=m("content"),this.h()},l(t){e=r(t,"P",{class:!0});var s=n(e);a=i(s,"DD/MM/YYYY"),s.forEach(c),l=f(t),p=r(t,"H1",{class:!0});var o=n(p);g=i(o,"topic"),o.forEach(c),b=f(t),k=r(t,"P",{class:!0});var d=n(k);v=i(d,"content"),d.forEach(c),this.h()},h(){o(e,"class","px-1.5 py-0.5 text-white dark:text-gray-800 m-2 w-max opacity-80 text-base sm:text-lg ml-auto sm:rounded-lg rounded-md"),o(p,"class","p-3 pl-1 mb-2 ml-1 text-3xl font-thin text-gray-900 border shadow-xl sm:text-5xl md:text-7xl sm:ml-3 rounded-xl max-w-max dark:text-cyan-900"),o(k,"class","p-3 mb-3 text-base text-white sm:text-xl")},m(t,s){d(t,e,s),h(e,a),d(t,l,s),d(t,p,s),h(p,g),d(t,b,s),d(t,k,s),h(k,v)},p:x,d(t){t&&c(e),t&&c(l),t&&c(p),t&&c(b),t&&c(k)}}}function D(t){let e,a,m,u,i={ctx:t,current:null,token:null,hasCatch:!1,pending:E,then:w,catch:v,value:2};return l(t[0](),i),{c(){e=s("div"),a=s("section"),m=s("div"),u=s("article"),i.block.c(),this.h()},l(t){e=r(t,"DIV",{class:!0});var l=n(e);a=r(l,"SECTION",{class:!0});var s=n(a);m=r(s,"DIV",{class:!0});var o=n(m);u=r(o,"ARTICLE",{class:!0});var d=n(u);i.block.l(d),d.forEach(c),o.forEach(c),s.forEach(c),l.forEach(c),this.h()},h(){o(u,"class","flex flex-col w-full p-1 shadow-lg from-green-400 via-emerald-400 to-teal-400 dark:sw bg-gradient-to-tr dark:from-cyan-400 dark:to-teal-200 rounded-3xl"),o(m,"class","w-11/12"),o(a,"class","flex flex-col items-center w-full py-5 bg-gray-900 font-jetMono dark:bg-white"),o(e,"class","select-none dark")},m(t,l){d(t,e,l),h(e,a),h(a,m),h(m,u),i.block.m(u,i.anchor=null),i.mount=()=>u,i.anchor=null},p(e,[a]){{const l=(t=e).slice();l[2]=i.resolved,i.block.p(l,a)}},i:x,o:x,d(t){t&&c(e),i.block.d(),i.token=null,i=null}}}async function Y(t){return{props:{slug:t.page.params.slug}}}function M(t,e,a){let{slug:l}=e;return t.$$set=t=>{"slug"in t&&a(1,l=t.slug)},[function(){return b.from("Blogs").select("*").eq("id",l)},l]}export default class extends t{constructor(t){super(),e(this,t,M,D,a,{slug:1,getD:0})}get getD(){return this.$$.ctx[0]}}export{Y as load};
