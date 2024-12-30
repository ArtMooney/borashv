import{_ as f}from"./Header-B6zbv5Lr.js";import{L as b,l as c}from"./listTable-ClOk5koV.js";import{o as t,c as l,a as n,b as p,d as g,F as d,r as v,t as s,e as i,u as _}from"./index-p4md80Im.js";import{_ as m}from"./TextBlock-rl4awofz.js";const x={id:"bokningslista",class:"grid grid-cols-1 gap-2 px-4 py-12 md:px-8"},B={class:"cursor-pointer border border-white/15 bg-gradient-to-r from-[#32382d] to-[#353238] p-4 transition-colors duration-300 ease-in-out hover:from-[#343a2e] hover:to-[#37343a] hover:shadow-[0_0_20px_rgba(185,177,99,0.35)]"},w={class:"grid grid-cols-2"},y={class:"mr-2 flex flex-col gap-2 border-r-2 border-white/15 text-xs md:text-sm"},j={class:"text-gray-400 underline"},M={class:"bold hyphens-auto break-words font-gunplay text-xl lg:text-2xl",lang:"sv"},S={class:"flex flex-col gap-0.5 text-xs md:text-sm"},D={key:2,class:"bg-[#a38373] p-4 text-black"},L={name:"Bokningar",data(){return{items:{},itemsLoaded:!1,errorMessage:"",showErrorMessage:!1}},async created(){this.items=await c("218350"),this.items.error?(this.errorMessage="Något gick fel när bokningarna skulle hämtas.",this.itemsLoaded=!1,this.showErrorMessage=!0):this.items.results.length>0?(this.items=this.items.results,this.itemsLoaded=!0):(this.errorMessage="Det finns inga bokningar för tillfället.",this.itemsLoaded=!1,this.showErrorMessage=!0)},methods:{displayToFromDate(r){if(r)return r=JSON.parse(r),r?r[0]===r[1]?this.formatDate(r[0]):`${this.formatDate(r[0])} - ${this.formatDate(r[1])}`:""},formatDate(r){let e=new Date(r),o=e.getDate(),u=["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"][e.getMonth()],h=e.getFullYear();return`${o} ${u} ${h}`}}},E=Object.assign(L,{setup(r){return(e,o)=>(t(),l("div",x,[o[0]||(o[0]=n("h4",{class:"text-3xl uppercase"},"Bokningslista",-1)),!e.itemsLoaded&&!e.showErrorMessage?(t(),p(b,{key:0})):g("",!0),e.itemsLoaded?(t(!0),l(d,{key:1},v(e.items,a=>(t(),l("div",B,[n("div",w,[n("div",y,[n("p",j,s(e.displayToFromDate(a["datum|to-from"])),1),n("div",M,s(a.titel),1)]),n("div",S,[n("p",null,s(a.lokal?"Lokal: "+a.lokal:""),1),n("p",null,s(a.org?"Org: "+a.org:""),1),n("p",null,s(a.tid?"Tid: "+a.tid:""),1)])])]))),256)):g("",!0),e.showErrorMessage?(t(),l("div",D,s(e.errorMessage),1)):g("",!0)]))}}),k="/assets/sean-foster-PMmb0MEE7Co-unsplash-Ci93TQ9z.jpg",T={name:"Bokningar",data(){return{textBokningar:`
      All verksamhet i hemvärnsgården skall förbokas, även regelbunden
      återkommande verksamhet.

      Bokning sker via David Wernold.
      Email: <a href="mailto:boka_hv_garden@mail.com">boka_hv_garden@mail.com</a>
      Tel./sms: <a href="tel:0703356483">0703-356483</a>

      Nyckel hämtas/lämnas enl. överenskommelse.

      Bokningsbart:
      * Konferensrum
      * Samlingssal
      * Mäss
      * Logementen
      * Projektor/kopiator

      Ev. debitering enl. prislista.
      Bokningsregler finns längre ner på denna sida.
    `,textBokningsregler:`
      All verksamhet i hemvärnsgården skall förbokas, även regelbunden återkommande verksamhet.

      Bokning sker via David Wernold.
      Email: <a href="mailto:boka_hv_garden@mail.com">boka_hv_garden@mail.com</a>
      Tel./sms: <a href="tel:0703356483">0703-356483</a>

      Bokningsbart:
      * Konferensrum
      * Samlingssal
      * Mäss
      * Logementen
      * Projektor/kopiator

      Allmänna regler:
      * När du bokar, tala om vilken del/delar som det gäller
      * Ev. debitering sker enl. prislista
      * Förbjudet att beträda övervåningen utan särskilt tillstånd
      * I alla bokningar ingår tillgång till kök, toalett och dusch om inget annat avtalats
      * Alla bokningar läggs genom föreningens försorg ut på hemsidan www.borashv.se
      * Den som bokar lokal skall följa städreglerna på anslagstavlan i vestibulen
      * Utebliven städning medför faktura på städavgift från föreningen
      * Städutrustning finns i städskrubb i kök
      * Skada på fastighet eller inventarier skall alltid anmälas
      * Vid användande av logement skall alltid underlakan, påslakan och örngott användas
      * Sängkläder finns att hyra för 50 kr per set
      * Utrymningsvägar vid brand och brandpostplaceringar skall beaktas
      * Rökning och införande av pälsdjur är förbjuden i samtliga utrymmen
      * Den som bokar lokal ansvarar för att dessa regler följs

      Städregler efter användning:
      * Torka av använda bord
      * Sopa av golven
      * Kolla så att det är fräscht på toaletten
      * Töm alla papperskorgar och bär ut soporna till soptunnan
      * Torka av alla bänkar + köksön i köket
      * Sopa och torka av golvet i köket

      För att behålla vår fina hemvärnsgård i bra skick så vill vi att alla hjälps åt och följer dom ovanstående punkterna.
      OBS: Om städreglerna inte följs debiteras en städkostnad på 1000:- enligt styrelsens beslut.

      /Styrelsen
    `}},head:{title:"Boka Lokaler | Hemvärnsgården Borås | Konferens & Samlingssal",meta:[{name:"keywords",content:"hemvärnsgården borås, lokalbokning borås, konferenslokal borås, samlingssal, mäss bokning, logement borås, militär konferenslokal, möteslokal borås"},{name:"robots",content:"index, follow"},{name:"description",content:"Boka lokaler i Hemvärnsgården Borås - konferensrum, samlingssal, mäss och logement. Fullutrustat med projektor och kök. Enkel bokning via telefon eller e-post."},{property:"og:title",content:"Lokalbokning Hemvärnsgården Borås - Konferens & Samlingslokaler"},{property:"og:description",content:"Hyr våra lokaler i centrala Borås - konferensrum, samlingssal, mäss och logement. Perfekt för möten, evenemang och övernattning. Boka enkelt via vår bokningsansvarige."},{property:"og:image",content:k}]}},A=Object.assign(T,{setup(r){return(e,o)=>(t(),l(d,null,[i(f,{image:_(k),"button-text-one":"Bokningslista","button-link-one":"/bokningar#bokningslista","button-text-two":"Bokningsregler","button-link-two":"/bokningar#bokningsregler"},null,8,["image"]),i(m,{title:"Bokningar",text:e.textBokningar,class:"mx-auto w-full max-w-screen-xl"},null,8,["text"]),i(E,{class:"mx-auto w-full max-w-screen-xl"}),i(m,{id:"bokningsregler",title:"Bokningsregler",text:e.textBokningsregler,class:"mx-auto w-full max-w-screen-xl"},null,8,["text"])],64))}});export{A as default};
