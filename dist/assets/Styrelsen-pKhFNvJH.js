import{L as p,l as f}from"./listTable-ClOk5koV.js";import{o as t,c as a,a as n,e as m,u as c,R as h,b as g,d as o,F as v,r as k,t as i,f as d}from"./index-p4md80Im.js";const b="/assets/pexels-skylar-kang-6044253-COhMO9TC.jpg",_="/assets/dogtag-o4rnQvoU.png",w={class:"relative grow px-4 py-12 md:px-8"},x={class:"absolute bottom-0 left-0 right-0 top-0 flex items-center overflow-hidden"},y={key:1,class:"mx-auto flex w-full max-w-screen-xl flex-row flex-wrap justify-start"},L={class:"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pb-5 pr-4 md:pb-8 md:pr-8"},M={class:"text-base font-bold md:text-lg"},E={key:0},B={key:1},S={key:2},j={key:2,class:"relative bg-[#a38373] p-4 text-black"},H={name:"StyrelsenList",data(){return{items:{},itemsLoaded:!1,errorMessage:"",showErrorMessage:!1}},computed:{sortedItems(){return[...this.items].sort((l,e)=>l.id-e.id)}},async created(){this.items=await f("409345"),this.items.error?(this.errorMessage="Något gick fel när listan skulle hämtas.",this.itemsLoaded=!1,this.showErrorMessage=!0):this.items.results.length>0?(this.items=this.items.results,this.itemsLoaded=!0):(this.errorMessage="Kan inte ladda några personer från styrelsen för tillfället.",this.itemsLoaded=!1,this.showErrorMessage=!0)},methods:{handleScroll(){const l=window.scrollY;document.querySelectorAll(".parallax-background").forEach(function(s){const u=l*.25;s.style.transform=`translateY(${u}px)`})}},beforeMount(){window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)}},O=Object.assign(H,{setup(l){return(e,s)=>(t(),a("div",w,[n("div",x,[m(h,{src:c(b),alt:"",class:"parallax-background h-full w-full object-cover"},null,8,["src"])]),s[1]||(s[1]=n("div",{class:"absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-neutral-900 to-black/75 sm:to-black/50"},null,-1)),s[2]||(s[2]=n("h4",{class:"relative pb-8 text-3xl uppercase"},"Styrelsen",-1)),!e.itemsLoaded&&!e.showErrorMessage?(t(),g(p,{key:0})):o("",!0),e.itemsLoaded?(t(),a("div",y,[(t(!0),a(v,null,k(e.sortedItems,r=>(t(),a("div",{key:r.id,class:"relative w-[25rem] text-xs sm:w-[16rem] md:w-[21rem] md:text-sm xl:w-[19rem]"},[m(h,{src:c(_),alt:"item.name"},null,8,["src"]),n("div",L,[n("span",M,i(r.name),1),s[0]||(s[0]=n("br",null,null,-1)),d(" "+i(r.title),1),r.title?(t(),a("br",E)):o("",!0),d(" "+i(r.email),1),r.email?(t(),a("br",B)):o("",!0),d(" "+i(r.phone),1),r.phone?(t(),a("br",S)):o("",!0)])]))),128))])):o("",!0),e.showErrorMessage?(t(),a("div",j,i(e.errorMessage),1)):o("",!0)]))}}),V={name:"Styrelsen",head:{title:"Om Borås Hemvärnsförening | Verksamhet & Historia sedan 2007",meta:[{name:"keywords",content:"borås hemvärnsförening, borås hemvärnskompani, hemvärnet borås historia, föreningsverksamhet hemvärnet, militär föreningsverksamhet borås, hemvärnsgården verksamhet, luciafirande hemvärnet"},{name:"robots",content:"index, follow"},{name:"description",content:"Borås Hemvärnsförening stödjer hemvärnsverksamheten i Borås stad sedan 2007. Vi förvaltar Hemvärnsgården, arrangerar evenemang och stödjer militär föreningsverksamhet. Medlemskap endast 50kr/år!"},{property:"og:title",content:"Om Borås Hemvärnsförening - Stödjande verksamhet sedan 2007"},{property:"og:description",content:"Upptäck hur Borås Hemvärnsförening stödjer Hemvärnet genom förvaltning av Hemvärnsgården, ekonomiskt stöd till aktiviteter och traditionellt luciafirande. Bli medlem för endast 50kr/år!"},{property:"og:image",content:""}]}},$=Object.assign(V,{setup(l){return(e,s)=>(t(),g(O))}});export{$ as default};
