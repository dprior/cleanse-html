var globalOptions = {
  entity:true,
  head:true,
  script:true,
  iframe:true,
  style:true,
  html:true
};
function cleanseHtml(str, options){
  if(typeof str === 'object')
    options = str;
  if(typeof options !== 'object'){
    options = globalOptions;
  }else{
    for(var key in globalOptions){
      if(globalOptions.hasOwnProperty(key) && typeof options[key] === 'undefined'){
        options[key] = globalOptions[key];
      }
    }
  }
  if(typeof str === 'string')
    return cleanse();

  function cleanse(){
    var entityName = {"lt":"<","gt":">","amp":"&","acute":"´","cedil":"¸","circ":"ˆ","macr":"¯","middot":"·","tilde":"˜","uml":"¨","Aacute":"Á",
                      "aacute":"á","Acirc":"Â","acirc":"â","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","Aring":"Å","aring":"å","Atilde":"Ã",
                      "atilde":"ã","Auml":"Ä","auml":"ä","Ccedil":"Ç","ccedil":"ç","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È",
                      "egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","Igrave":"Ì",
                      "igrave":"ì","Iuml":"Ï","iuml":"ï","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","OElig":"Œ",
                      "oelig":"œ","Ograve":"Ò","ograve":"ò","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","Scaron":"Š",
                      "scaron":"š","szlig":"ß","THORN":"Þ","thorn":"þ","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù",
                      "Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yuml":"ÿ","Yuml":"Ÿ","cent":"¢","curren":"¤","euro":"€","pound":"£","yen":"¥",
                      "brvbar":"¦","bull":"•","copy":"©","dagger":"†","Dagger":"‡","frasl":"⁄","hellip":"…","iexcl":"¡","image":"ℑ","iquest":"¿",
                      "lrm":"‎","mdash":"—","ndash":"–","not":"¬","oline":"‾","ordf":"ª","ordm":"º","para":"¶","permil":"‰","prime":"′","Prime":"″",
                      "real":"ℜ","reg":"®","rlm":"‏","sect":"§","sup1":"¹","trade":"™","weierp":"℘","bdquo":"„","laquo":"«","ldquo":"“","lsaquo":"‹",
                      "lsquo":"‘","raquo":"»","rdquo":"”","rsaquo":"›","rsquo":"’","sbquo":"‚","emsp":" ","ensp":" ","nbsp":" ","thinsp":" ","zwj":"‍",
                      "zwnj":"‌","deg":"°","divide":"÷","frac12":"½","frac14":"¼","frac34":"¾","ge":"≥","le":"≤","minus":"−","sup2":"²","sup3":"³",
                      "times":"×","alefsym":"ℵ","and":"∧","ang":"∠","asymp":"≈","cap":"∩","cong":"≅","cup":"∪","empty":"∅","equiv":"≡","exist":"∃",
                      "fnof":"ƒ","forall":"∀","infin":"∞","int":"∫","isin":"∈","lang":"⟨","lceil":"⌈","lfloor":"⌊","lowast":"∗","micro":"µ","nabla":"∇",
                      "ne":"≠","ni":"∋","notin":"∉","nsub":"⊄","oplus":"⊕","or":"∨","otimes":"⊗","part":"∂","perp":"⊥","plusmn":"±","prod":"∏",
                      "prop":"∝","radic":"√","rang":"⟩","rceil":"⌉","rfloor":"⌋","sdot":"⋅","sim":"∼","sub":"⊂","sube":"⊆","sum":"∑","sup":"⊃",
                      "supe":"⊇","there4":"∴","Alpha":"Α","alpha":"α","Beta":"Β","beta":"β","Chi":"Χ","chi":"χ","Delta":"Δ","delta":"δ","Epsilon":"Ε",
                      "epsilon":"ε","Eta":"Η","eta":"η","Gamma":"Γ","gamma":"γ","Iota":"Ι","iota":"ι","Kappa":"Κ","kappa":"κ","Lambda":"Λ","lambda":"λ",
                      "Mu":"Μ","mu":"μ","Nu":"Ν","nu":"ν","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","Phi":"Φ","phi":"φ","Pi":"Π","pi":"π",
                      "piv":"ϖ","Psi":"Ψ","psi":"ψ","quot":"\"","Rho":"Ρ","rho":"ρ","Sigma":"Σ","sigma":"σ","sigmaf":"ς","Tau":"Τ","tau":"τ",
                      "Theta":"Θ","theta":"θ","thetasym":"ϑ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","Xi":"Ξ","xi":"ξ","Zeta":"Ζ","zeta":"ζ","crarr":"↵",
                      "darr":"↓","dArr":"⇓","harr":"↔","hArr":"⇔","larr":"←","lArr":"⇐","rarr":"→","rArr":"⇒","uarr":"↑","uArr":"⇑","clubs":"♣",
                      "diams":"♦","hearts":"♥","spades":"♠","loz":"◊"};
    	if(typeof str == 'undefined')
    		return "";
    	if(options.entity){
        str = str.replace(/&([A-Za-z]+);/g, function(fullStr, match){return entityName.hasOwnProperty(match) ? entityName[match] : fullStr});
        str = str.replace(/&#(\d{1,4});/, function(fullStr, code) { return String.fromCharCode(code); });
      }
      if(options.script)
    	  str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,' '); //removes script section entirely
    	if(options.iframe)
        str = str.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,' '); //removes iframe section entirely
    	if(options.head)
        str = str.replace(/<head\b[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>/gi,' '); //removes head section entirely
    	if(options.style)
        str = str.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,' '); //removes style section entirely
      if(options.html)
        str = str.replace(/<(?:.|\n)*?>/gm,' '); //remove all remaining tags
        //cleanup
  		str = str.replace(/\s{2,}/g, ' '); //replace more than one space with a single space
  		str = str.replace(/^\s+/,''); //remove lead space
      str = str.replace(/\s+$/,''); //remove trailing space
      return str;
  }
}
cleanseHtml.configure = function(options){
  options = options || {};
  for(var key in options){
    if(options.hasOwnProperty(key) && typeof globalOptions[key] !== 'undefined'){
      globalOptions[key] = options[key];
    }
  }
};
module.exports = cleanseHtml;
