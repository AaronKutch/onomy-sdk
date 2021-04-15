(window.webpackJsonp=window.webpackJsonp||[]).push([[148],{727:function(e,t,a){"use strict";a.r(t);var c=a(1),o=Object(c.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"object-capability-model"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#object-capability-model"}},[e._v("#")]),e._v(" Object-Capability Model")]),e._v(" "),a("h2",{attrs:{id:"intro"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#intro"}},[e._v("#")]),e._v(" Intro")]),e._v(" "),a("p",[e._v("When thinking about security, it is good to start with a specific threat model. Our threat model is the following:")]),e._v(" "),a("blockquote",[a("p",[e._v("We assume that a thriving ecosystem of Onomy-SDK modules that are easy to compose into a blockchain application will contain faulty or malicious modules.")])]),e._v(" "),a("p",[e._v("The Cosmos SDK is designed to address this threat by being the\nfoundation of an object capability system.")]),e._v(" "),a("blockquote",[a("p",[e._v("The structural properties of object capability systems favor\nmodularity in code design and ensure reliable encapsulation in\ncode implementation.")]),e._v(" "),a("p",[e._v("These structural properties facilitate the analysis of some\nsecurity properties of an object-capability program or operating\nsystem. Some of these — in particular, information flow properties\n— can be analyzed at the level of object references and\nconnectivity, independent of any knowledge or analysis of the code\nthat determines the behavior of the objects.")]),e._v(" "),a("p",[e._v("As a consequence, these security properties can be established\nand maintained in the presence of new objects that contain unknown\nand possibly malicious code.")]),e._v(" "),a("p",[e._v("These structural properties stem from the two rules governing\naccess to existing objects:")]),e._v(" "),a("ol",[a("li",[e._v("An object A can send a message to B only if object A holds a\nreference to B.")]),e._v(" "),a("li",[e._v('An object A can obtain a reference to C only\nif object A receives a message containing a reference to C. As a\nconsequence of these two rules, an object can obtain a reference\nto another object only through a preexisting chain of references.\nIn short, "Only connectivity begets connectivity."')])])]),e._v(" "),a("p",[e._v("For an introduction to object-capabilities, see this "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Object-capability_model",target:"_blank",rel:"noopener noreferrer"}},[e._v("Wikipedia article"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"ocaps-in-practice"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ocaps-in-practice"}},[e._v("#")]),e._v(" Ocaps in practice")]),e._v(" "),a("p",[e._v("The idea is to only reveal what is necessary to get the work done.")]),e._v(" "),a("p",[e._v("For example, the following code snippet violates the object capabilities\nprinciple:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBBcHBBY2NvdW50IHN0cnVjdCB7Li4ufQphY2NvdW50IDo9ICZhbXA7QXBwQWNjb3VudHsKICAgIEFkZHJlc3M6IHB1Yi5BZGRyZXNzKCksCiAgICBDb2luczogc2RrLkNvaW5ze3Nkay5OZXdJbnQ2NENvaW4oJnF1b3Q7QVRNJnF1b3Q7LCAxMDApfSwKfQpzdW1WYWx1ZSA6PSBleHRlcm5hbE1vZHVsZS5Db21wdXRlU3VtVmFsdWUoYWNjb3VudCkK"}}),e._v(" "),a("p",[e._v("The method "),a("code",[e._v("ComputeSumValue")]),e._v(" implies a pure function, yet the implied\ncapability of accepting a pointer value is the capability to modify that\nvalue. The preferred method signature should take a copy instead.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"c3VtVmFsdWUgOj0gZXh0ZXJuYWxNb2R1bGUuQ29tcHV0ZVN1bVZhbHVlKCphY2NvdW50KQo="}}),e._v(" "),a("p",[e._v("In the Cosmos SDK, you can see the application of this principle in the\ngaia app.")]),e._v(" "),a("p",[a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"CS8vIGFkZCBrZWVwZXJzCglhcHAuQWNjb3VudEtlZXBlciA9IGF1dGhrZWVwZXIuTmV3QWNjb3VudEtlZXBlcigKCQlhcHBDb2RlYywga2V5c1thdXRodHlwZXMuU3RvcmVLZXldLCBhcHAuR2V0U3Vic3BhY2UoYXV0aHR5cGVzLk1vZHVsZU5hbWUpLCBhdXRodHlwZXMuUHJvdG9CYXNlQWNjb3VudCwgbWFjY1Blcm1zLAoJKQoJYXBwLkJhbmtLZWVwZXIgPSBiYW5ra2VlcGVyLk5ld0Jhc2VLZWVwZXIoCgkJYXBwQ29kZWMsIGtleXNbYmFua3R5cGVzLlN0b3JlS2V5XSwgYXBwLkFjY291bnRLZWVwZXIsIGFwcC5HZXRTdWJzcGFjZShiYW5rdHlwZXMuTW9kdWxlTmFtZSksIGFwcC5CbG9ja2VkQWRkcnMoKSwKCSkKCXN0YWtpbmdLZWVwZXIgOj0gc3Rha2luZ2tlZXBlci5OZXdLZWVwZXIoCgkJYXBwQ29kZWMsIGtleXNbc3Rha2luZ3R5cGVzLlN0b3JlS2V5XSwgYXBwLkFjY291bnRLZWVwZXIsIGFwcC5CYW5rS2VlcGVyLCBhcHAuR2V0U3Vic3BhY2Uoc3Rha2luZ3R5cGVzLk1vZHVsZU5hbWUpLAoJKQoJYXBwLk1pbnRLZWVwZXIgPSBtaW50a2VlcGVyLk5ld0tlZXBlcigKCQlhcHBDb2RlYywga2V5c1ttaW50dHlwZXMuU3RvcmVLZXldLCBhcHAuR2V0U3Vic3BhY2UobWludHR5cGVzLk1vZHVsZU5hbWUpLCAmYW1wO3N0YWtpbmdLZWVwZXIsCgkJYXBwLkFjY291bnRLZWVwZXIsIGFwcC5CYW5rS2VlcGVyLCBhdXRodHlwZXMuRmVlQ29sbGVjdG9yTmFtZSwKCSkKCWFwcC5EaXN0cktlZXBlciA9IGRpc3Rya2VlcGVyLk5ld0tlZXBlcigKCQlhcHBDb2RlYywga2V5c1tkaXN0cnR5cGVzLlN0b3JlS2V5XSwgYXBwLkdldFN1YnNwYWNlKGRpc3RydHlwZXMuTW9kdWxlTmFtZSksIGFwcC5BY2NvdW50S2VlcGVyLCBhcHAuQmFua0tlZXBlciwKCQkmYW1wO3N0YWtpbmdLZWVwZXIsIGF1dGh0eXBlcy5GZWVDb2xsZWN0b3JOYW1lLCBhcHAuTW9kdWxlQWNjb3VudEFkZHJzKCksCgkpCglhcHAuU2xhc2hpbmdLZWVwZXIgPSBzbGFzaGluZ2tlZXBlci5OZXdLZWVwZXIoCgkJYXBwQ29kZWMsIGtleXNbc2xhc2hpbmd0eXBlcy5TdG9yZUtleV0sICZhbXA7c3Rha2luZ0tlZXBlciwgYXBwLkdldFN1YnNwYWNlKHNsYXNoaW5ndHlwZXMuTW9kdWxlTmFtZSksCgkpCglhcHAuQ3Jpc2lzS2VlcGVyID0gY3Jpc2lza2VlcGVyLk5ld0tlZXBlcigKCQlhcHAuR2V0U3Vic3BhY2UoY3Jpc2lzdHlwZXMuTW9kdWxlTmFtZSksIGludkNoZWNrUGVyaW9kLCBhcHAuQmFua0tlZXBlciwgYXV0aHR5cGVzLkZlZUNvbGxlY3Rvck5hbWUsCgkpCglhcHAuVXBncmFkZUtlZXBlciA9IHVwZ3JhZGVrZWVwZXIuTmV3S2VlcGVyKHNraXBVcGdyYWRlSGVpZ2h0cywga2V5c1t1cGdyYWRldHlwZXMuU3RvcmVLZXldLCBhcHBDb2RlYywgaG9tZVBhdGgp"}})],1),e._v(" "),a("h2",{attrs:{hide:"",id:"next"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#next"}},[e._v("#")]),e._v(" Next")]),e._v(" "),a("p",{attrs:{hide:""}},[e._v("Learn about the "),a("RouterLink",{attrs:{to:"/core/runtx_middleware.html"}},[a("code",[e._v("runTx")]),e._v(" middleware")])],1)],1)}),[],!1,null,null,null);t.default=o.exports}}]);