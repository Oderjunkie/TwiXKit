var settings;
var oldsettings;
var interval;
var sizes;
var lastId;
if (localStorage.settings!==undefined) {
    settings = JSON.parse(localStorage.settings);
    oldsettings = JSON.parse(localStorage.settings);
} else {
    settings = {
        'encode': false,
        'color': 'blue',
    };
    oldsettings = {
        'encode': false,
        'color': 'blue',
    };
    localStorage.settings = JSON.stringify(settings);
}
const deref = arg => JSON.parse(JSON.stringify(arg))
function revertSettings(){
    settings = deref(oldsettings);
}
function confirmSettings(){
    oldsettings = deref(settings);
    localStorage.settings = JSON.stringify(settings);
}
function changecolorto(col) {
	let a = document.querySelector('.js-app-header-inner');
	let b = document.querySelector('.avatar');
	a.style.transition = '1s filter';
	b.style.transition = '1s filter';
	settings.color = col;
	confirmSettings();
	switch (col) {
		case 'blue':
			a.style.filter = '';
			b.style.filter = '';
			break;
		case 'yellow':
			a.style.filter = 'hue-rotate(195deg) saturate(89.17%) brightness(94.8%)';
			b.style.filter = 'hue-rotate(165deg) saturate(112.15%) brightness(105.47%)';
			break;
		case 'red':
			a.style.filter = 'hue-rotate(139.5deg) saturate(118.89%) brightness(104.92%)';
			b.style.filter = 'hue-rotate(220.5deg) saturate(84.11%) brightness(95.31%)';
			break;
		case 'purple':
			a.style.filter = 'hue-rotate(60deg) saturate(175.41%)';
			b.style.filter = 'hue-rotate(300deg) saturate(57%)';
			break;
		case 'orange':
			a.style.filter = 'hue-rotate(174deg) saturate(98.62%) brightness(97.7%)';
			b.style.filter = 'hue-rotate(186deg) saturate(101.4%)';
			break;
		case 'green':
			a.style.filter = 'hue-rotate(304.5deg) saturate(113.83%) brightness(126.73%)';
			b.style.filter = 'hue-rotate(55.5deg) saturate(87.85%) brightness(78.9%)';
			break;
	}
}
function tweetlong(){
                    function tweetOut(text) {
                        document.getElementsByClassName('js-show-drawer')[0].click();
                        document.getElementsByClassName('js-app-content')[0].style.transform = ''
                        document.getElementsByClassName('js-app-content')[0].style.marginRight = '0'
                        document.getElementsByClassName('js-hide-drawer')[0].style.backgroundColor = '#1da1f2'
                        document.getElementsByClassName('js-hide-drawer')[0].style.borderRadius = '45px'
                        document.getElementsByClassName('js-hide-drawer')[0].style.width = '36px'
                        document.getElementsByClassName('js-compose-text')[0].value=text;{
                        let tmp = document.createEvent('HTMLEvents');
                        tmp.initEvent('change', true, true);
                        tmp.eventName='change';
                        document.getElementsByClassName('js-compose-text')[0].dispatchEvent(tmp);}
                        document.getElementsByClassName('js-send-button')[0].click();
                        console.log(`Tweeted out ${text}`);
                    }
                    function slice(str) {
                    
    if (str.length<280) return [str]
                    
    out = str.substr(0,280);
                        if (str[280]==' ') {
                    
        return [out, ...slice('LT ' + str.substr(281))];
                    
    } else {

                            return [out.substr(0,out.lastIndexOf(' ')), ...slice('LT ' + str.substr(out.lastIndexOf(' ')+1))]
                    
    }

                    }
                    outs = slice(document.getElementsByClassName('js-compose-text')[0].value)
                    document.getElementsByClassName('js-compose-text')[0].value = outs.shift()
                    console.log(`Tweeted out ${document.getElementsByClassName('js-compose-text')[0].value}`);
                    document.getElementsByClassName('js-send-button')[0].click();
                    outs.forEach(tweetOut)
                }
function test(){try{
console.log('Twixkit loaded');
setTimeout(()=>{
	Array.from(document.querySelectorAll('.js-app-columns section')).forEach(el=>{el.style.resize = 'horizontal'})
	if (localStorage.sizes===undefined) {
		sizes = Array.from(document.querySelectorAll('.js-app-columns section')).reduce((acc, el)=>{return acc.concat([el.style.width])}, []);
		localStorage.sizes = JSON.stringify(sizes);
	} else {
		sizes = JSON.parse(localStorage.sizes);
	}
	Array.from(document.querySelectorAll('.js-app-columns section')).forEach((e, i)=>{e.style.width=sizes[i]});
	interval = setInterval(function(){
		changecolorto(settings.color);
		sizes = Array.from(document.querySelectorAll('.js-app-columns section')).reduce((acc, el)=>{return acc.concat([el.style.width])}, []);
		localStorage.sizes = JSON.stringify(sizes);
		localStorage.lastTweet = document.querySelector('.chirp-container article:last-child').getAttribute('data-tweet-id');
	}, 1000);
	/*if (localStorage.lastTweet===undefined) {
		home = Array.from(document.querySelectorAll('.column-heading')).reduce((prv, curr)=> curr.innerText=='Home'?curr:prv).parentElement.parentElement.parentElement.nextElementSibling.children[4].children[0];
		homedoc = document.implementation.createHTMLDocument('');
		homedoc.open();
		homedoc.write(home.innerHTML);
		homedoc.close();
		let lt = homedoc.querySelector('.chirp-container article:last-child').getAttribute('data-tweet-id');
		if (lt!==null) {
			localStorage.lastTweet = lt;
		}
	} else {
		console.log('Loop');
		let loop = setInterval(()=>{
			if (document.querySelector(`article[data-tweet-id="${localStorage.lastTweet}"]`)!==null) {
				clearInterval(loop);
				let last = document.querySelector(`article[data-tweet-id="${localStorage.lastTweet}"]`);
				last.parentElement.insertBefore(document.createElement('hr'), last);
				last.scrollIntoView();
				console.log('found');
			} else {
				document.querySelector('.chirp-container article:last-child').scrollIntoView();
				console.log('scroll');
			}
		}, 100);
	}*/
}, 100);
document.querySelector('.invisible-in-contracted-header img').src = browser.extension.getURL('edit.svg');
document.querySelector('.tweetdeck-logo').style.background = `url("${browser.extension.getURL('edit.svg')}")`;
document.querySelector('.tweetdeck-logo').style.backgroundSize = 'cover';
document.querySelector('.tweetdeck-logo').style.backgroundPosition = '0 0';
document.querySelector('.tweetdeck-logo').style.backgroundRepeat = 'no-repeat';
document.getElementsByClassName('js-app')[0].removeEventListener('DOMNodeInserted', test);
document.getElementsByClassName('js-app-settings')[0].addEventListener('click', function(){setTimeout(function(){
let ul = document.getElementsByClassName('js-dropdown-content')[0].children[0];
let li = document.createElement('li');
li.classList.add('is-selectable');
let a = document.createElement('a');
a.href = '#';
a.setAttribute('data-action', 'customlol');
a.innerText = 'TwiXKit options';
li.appendChild(a);
li.addEventListener('mouseover', function(){this.classList.add('is-selected');});
li.addEventListener('mouseout', function(){this.classList.remove('is-selected');});
li.addEventListener('click', function(){
let container = document.getElementById('settings-modal');
container.style.display = 'block';
let context = document.createElement('div');
context.classList.add('js-modal-panel');
context.classList.add('mdl');
context.classList.add('s-short');
let header = document.createElement('header');
header.classList.add('js-drag-handle');
header.classList.add('padding-a--12');
header.classList.add('no-collapse');
header.classList.add('mdl-header');
header.classList.add('is-movable');
headertext = document.createElement('h3');
headertext.classList.add('mdl-header-title');
headertext.appendChild(document.createTextNode('TwiXKit Settings'));
let x = document.createElement('a');
x.classList.add('js-dismiss');
x.classList.add('mdl-dismiss');
x.classList.add('link-normal-dark');
x.setAttribute('href', '#');
let xicon = document.createElement('i');
xicon.classList.add('icon');
xicon.classList.add('icon-close');
xicon.classList.add('txt-size--18');
x.addEventListener('click', function(){
	revertSettings();
	this.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
	this.parentElement.parentElement.parentElement.remove();
});
let content = document.createElement('div');
content.classList.add('mdl-content');
content.classList.add('js-mdl-content');
content.classList.add('horizontal-flow-container');
let footer = document.createElement('footer');
footer.classList.add('padding-vxl');
footer.classList.add('txt-center');
let confirmWrapper = document.createElement('button');
confirmWrapper.classList.add('js-dismiss');
confirmWrapper.classList.add('Button--primary');
confirmWrapper.classList.add('pull-right');
let confirm = document.createElement('span');
confirm.classList.add('label');
confirm.appendChild(document.createTextNode('Done'));
confirm.addEventListener('click', function(){
	confirmSettings();
	this.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
	this.parentElement.parentElement.parentElement.parentElement.remove();
});
confirmWrapper.append(confirm);
footer.append(confirmWrapper);
header.appendChild(headertext);
headertext.appendChild(x);
let selection = document.createElement('div');
let data = document.createElement('div');
selection.classList.add('l-column');
selection.classList.add('mdl-column');
selection.classList.add('mdl-column-sml');
let listwrapper = document.createElement('div');
let list = document.createElement('ul');
listwrapper.classList.add('l-column-scrollv');
listwrapper.classList.add('scroll-v');
listwrapper.classList.add('scroll-styled-v');
listwrapper.classList.add('scroll-alt');
list.classList.add('lst-group');
list.classList.add('js-setting-list');
{
	let item = document.createElement('li');
	item.classList.add('selected');
	let link = document.createElement('a');
	link.href = '#';
	link.classList.add('list-link');
	link.setAttribute('data-action', 'custom');
	let text = document.createElement('strong');
	text.appendChild(document.createTextNode('General'));
	link.appendChild(text);
	let icon = document.createElement('i');
	icon.classList.add('chev-right');
	link.appendChild(icon);
	item.appendChild(link);
	list.appendChild(item);
}
{
	let item = document.createElement('li');
	let link = document.createElement('a');
	link.href = '#';
	link.classList.add('list-link');
	link.setAttribute('data-action', 'custom');
	let text = document.createElement('strong');
	text.appendChild(document.createTextNode('Extentions'));
	link.appendChild(text);
	let icon = document.createElement('i');
	icon.classList.add('chev-right');
	link.appendChild(icon);
	item.appendChild(link);
	list.appendChild(item);
}
listwrapper.appendChild(list);
selection.appendChild(listwrapper);
data.classList.add('l-column');
data.classList.add('mdl-column');
data.classList.add('mdl-column-lrg');
let datawrapper = document.createElement('div');
datawrapper.classList.add('l-column-scrollv');
datawrapper.classList.add('scroll-v');
datawrapper.classList.add('scroll-styled-v');
datawrapper.classList.add('scroll-alt');
datawrapper.classList.add('mdl-col-settings');
{
	let form = document.createElement('form');
	form.action = '#';
	form.id = 'global-settings';
	form.setAttribute('accept-charset', 'utf-8');
	form.classList.add('js-global-settings');
	form.classList.add('frm');
	let field = document.createElement('fieldset');
	{
		let legend = document.createElement('legend');
		legend.appendChild(document.createTextNode('General Settings'));
		field.appendChild(legend);
	}
	{
		let div = document.createElement('div');
		div.classList.add('control-group');
		{
			let textwrapper = document.createElement('div');
			let text = document.createElement('span');
			let icon = document.createElement('i');
			icon.classList.add('js-tweet-encoding');
			icon.classList.add('icon');
			icon.classList.add('icon-small');
			icon.classList.add('color-twitter-blue');
			icon.classList.add('js-toggle-switch');
			icon.classList.add('is-actionable');
			icon.classList.add('align-top');
			if (settings.encode) {
			    icon.classList.add('icon-toggle-on');
			} else {
			    icon.classList.add('icon-toggle-off');
			}
			icon.addEventListener('click', function(){
			    if (this.classList.replace('icon-toggle-off', 'icon-toggle-on')) {
			        window.settings.encode = true;
			    } else {
			        this.classList.replace('icon-toggle-on', 'icon-toggle-off');
			        window.settings.encode = false;
			    }
			});
			text.classList.add('margin-l--4');
			text.appendChild(document.createTextNode('Encode tweets to save space'));
			textwrapper.appendChild(icon);
			textwrapper.appendChild(text);
			field.appendChild(textwrapper);
		}
		{
			let bar = document.createElement('div');
			bar.classList.add('divider-bar');
			field.appendChild(bar);
		}
		{
			let radios = document.createElement('div');
			{
				let text = document.createElement('label');
				text.classList.add('fixed-width-label');
				text.classList.add('txt-uppercase');
				text.classList.add('touch-larger-label');
				let bold = document.createElement('b');
				bold.appendChild(document.createTextNode('Color (Glitchy)'));
				text.appendChild(bold);
				radios.appendChild(text);
			}
			{
				let button = document.createElement('label');
				button.classList.add('fixed-width-label');
				button.classList.add('radio');
				let input = document.createElement('input');
				input.type = 'radio';
				input.classList.add('js-settings-radio');
				input.classList.add('js-theme-radio');
				input.classList.add('touch-larger-label');
				input.name = 'theme';
				input.value = 'blue';
				input.addEventListener('change', function(){ changecolorto('blue'); });
				if (settings.color=='blue') input.setAttribute('checked', '');
				button.appendChild(input);
				let img = document.createElement('img');
				img.src = 'https://abs-0.twimg.com/emoji/v2/svg/1f499.svg';
				img.style.display = 'inline-block';
				img.style.height = '1em';
				let img2 = document.createElement('img');
				img2.src = 'https://abs-0.twimg.com/emoji/v2/svg/1f499.svg';
				img2.style.display = 'inline-block';
				img2.style.height = '1em';
				button.appendChild(img);
				button.appendChild(document.createTextNode(' Blue '));
				button.appendChild(img2);
				radios.appendChild(button);
			}
			{
				let button = document.createElement('label');
				button.classList.add('fixed-width-label');
				button.classList.add('radio');
				let input = document.createElement('input');
				input.type = 'radio';
				input.classList.add('js-settings-radio');
				input.classList.add('js-theme-radio');
				input.classList.add('touch-larger-label');
				input.name = 'theme';
				input.value = 'yellow';
				input.addEventListener('change', function(){ changecolorto('yellow'); });
				if (settings.color=='yellow') input.setAttribute('checked', '');
				button.appendChild(input);
				let img = document.createElement('img');
				img.src = 'https://abs-0.twimg.com/emoji/v2/svg/2b50.svg';
				img.style.display = 'inline-block';
				img.style.height = '1em';
				let img2 = document.createElement('img');
				img2.src = 'https://abs-0.twimg.com/emoji/v2/svg/2b50.svg';
				img2.style.display = 'inline-block';
				img2.style.height = '1em';
				button.appendChild(img);
				button.appendChild(document.createTextNode(' Yellow '));
				button.appendChild(img2);
				radios.appendChild(button);
			}
			{
				let button = document.createElement('label');
				button.classList.add('fixed-width-label');
				button.classList.add('radio');
				let input = document.createElement('input');
				input.type = 'radio';
				input.classList.add('js-settings-radio');
				input.classList.add('js-theme-radio');
				input.classList.add('touch-larger-label');
				input.name = 'theme';
				input.value = 'purple';
				input.addEventListener('change', function(){ changecolorto('red'); });
				if (settings.color=='red') input.setAttribute('checked', '');
				button.appendChild(input);
				let img = document.createElement('img');
				img.src = 'https://abs-0.twimg.com/emoji/v2/svg/1f338.svg';
				img.style.display = 'inline-block';
				img.style.height = '1em';
				let img2 = document.createElement('img');
				img2.src = 'https://abs-0.twimg.com/emoji/v2/svg/1f338.svg';
				img2.style.display = 'inline-block';
				img2.style.height = '1em';
				button.appendChild(img);
				button.appendChild(document.createTextNode(' Red '));
				button.appendChild(img2);
				radios.appendChild(button);
			}
			{
				let button = document.createElement('label');
				button.classList.add('fixed-width-label');
				button.classList.add('radio');
				let input = document.createElement('input');
				input.type = 'radio';
				input.classList.add('js-settings-radio');
				input.classList.add('js-theme-radio');
				input.classList.add('touch-larger-label');
				input.name = 'theme';
				input.value = 'purple';
				input.addEventListener('change', function(){ changecolorto('purple'); });
				if (settings.color=='purple') input.setAttribute('checked', '');
				button.appendChild(input);
				let img = document.createElement('img');
				img.src = 'https://abs-0.twimg.com/emoji/v2/svg/1f419.svg';
				img.style.display = 'inline-block';
				img.style.height = '1em';
				let img2 = document.createElement('img');
				img2.src = 'https://abs-0.twimg.com/emoji/v2/svg/1f419.svg';
				img2.style.display = 'inline-block';
				img2.style.height = '1em';
				button.appendChild(img);
				button.appendChild(document.createTextNode(' Purple '));
				button.appendChild(img2);
				radios.appendChild(button);
			}
			{
				let button = document.createElement('label');
				button.classList.add('fixed-width-label');
				button.classList.add('radio');
				let input = document.createElement('input');
				input.type = 'radio';
				input.classList.add('js-settings-radio');
				input.classList.add('js-theme-radio');
				input.classList.add('touch-larger-label');
				input.name = 'theme';
				input.value = 'orange';
				input.addEventListener('change', function(){ changecolorto('orange'); });
				if (settings.color=='orange') input.setAttribute('checked', '');
				button.appendChild(input);
				let img = document.createElement('img');
				img.src = 'https://abs-0.twimg.com/emoji/v2/svg/1f525.svg';
				img.style.display = 'inline-block';
				img.style.height = '1em';
				let img2 = document.createElement('img');
				img2.src = 'https://abs-0.twimg.com/emoji/v2/svg/1f525.svg';
				img2.style.display = 'inline-block';
				img2.style.height = '1em';
				button.appendChild(img);
				button.appendChild(document.createTextNode(' Orange '));
				button.appendChild(img2);
				radios.appendChild(button);
			}
			{
				let button = document.createElement('label');
				button.classList.add('fixed-width-label');
				button.classList.add('radio');
				let input = document.createElement('input');
				input.type = 'radio';
				input.classList.add('js-settings-radio');
				input.classList.add('js-theme-radio');
				input.classList.add('touch-larger-label');
				input.name = 'theme';
				input.value = 'green';
				input.addEventListener('change', function(){ changecolorto('green'); });
				if (settings.color=='green') input.setAttribute('checked', '');
				button.appendChild(input);
				let img = document.createElement('img');
				img.src = 'https://abs-0.twimg.com/emoji/v2/svg/1f951.svg';
				img.style.display = 'inline-block';
				img.style.height = '1em';
				let img2 = document.createElement('img');
				img2.src = 'https://abs-0.twimg.com/emoji/v2/svg/1f951.svg';
				img2.style.display = 'inline-block';
				img2.style.height = '1em';
				button.appendChild(img);
				button.appendChild(document.createTextNode(' Green '));
				button.appendChild(img2);
				radios.appendChild(button);
			}
			field.appendChild(radios);
		}
	}
form.appendChild(field);
datawrapper.appendChild(form);}
data.appendChild(datawrapper);
content.appendChild(selection);
content.appendChild(data);
context.appendChild(header);
x.appendChild(xicon);
let contentwrapper = document.createElement('div');
contentwrapper.classList.add('mdl-inner');
contentwrapper.appendChild(content);
contentwrapper.appendChild(footer);
context.appendChild(contentwrapper);
container.appendChild(context);
});
ul.insertBefore(li, ul.children[2]);
},5);});
document.getElementsByClassName('js-app-header')[0].onclick = function(){setTimeout(()=>{try{
    let outer = document.getElementsByClassName('js-compose-text')[0];
    if (outer!==undefined) {
        outer.onkeydown = function(){ setTimeout(()=>{
            let tx = this.parentNode.childNodes[8].childNodes[1]
            tx.textContent = 1000-this.value.length;
            if (this.value.length>280) {
                let el = document.getElementsByClassName('js-send-button')[0];
                let cr = document.getElementsByClassName('js-progress-circle')[0];
                document.getElementsByClassName('js-send-button')[0].addEventListener('click', tweetlong);
                if (this.value.length<=1000) {
                    el.classList.remove('is-disabled');
                    tx.classList.remove('color-twitter-red');
                    tx.classList.add('color-twitter-yellow');
                    cr.classList.remove('stroke-twitter-red');
                    cr.classList.add('stroke-twitter-yellow');
                    el.removeAttribute('data-original-title');
                } else {
                    el.classList.add('is-disabled');
                    tx.classList.add('color-twitter-red');
                    tx.classList.remove('color-twitter-yellow');
                    cr.classList.add('stroke-twitter-red');
                    cr.classList.remove('stroke-twitter-yellow');
                    el.setAttribute('data-original-title', 'Your Tweet is, still, too long');
                }
            } else {
                document.getElementsByClassName('js-send-button')[0].removeEventListener('click', tweetlong);
            } if (window.settings.encode) {
            this.value = this.value.replace(/DZ/g, '\u01F1')
                                   .replace(/Dz/g, '\u01F2')
                                   .replace(/dz/g, '\u01F3')
                                   .replace(/IJ/g, '\u0132')
                                   .replace(/ij/g, '\u0133')
                                   .replace(/LJ/g, '\u01C7')
                                   .replace(/Lj/g, '\u01C8')
                                   .replace(/lj/g, '\u01C9')
                                   .replace(/NJ/g, '\u01CA')
                                   .replace(/Nj/g, '\u01CB')
                                   .replace(/nj/g, '\u01CC')
                                   .replace(/AE/g, '\u00C6')
                                   .replace(/ae/g, '\u00E6')
                                   .replace(/ff/g, '\uFB00')
                                   .replace(/fi/g, '\uFB01')
                                   .replace(/fl/g, '\uFB02')
                                   .replace(/\uFB00i/g, '\uFB03')
                                   .replace(/\uFB00l/g, '\uFB04')
                                   .replace(/st/g, '\uFB06')
                                   .replace(/OE/g, '\u0152')
                                   .replace(/oe/g, '\u0153')
                                   .replace(/ft/g, '\uFB05')
                                   .replace(/ue/g, '\u1D6B')
                                   .replace(/db/g, '\u0238')
                                   .replace(/dz/g, '\u02A3')
                                   .replace(/ls/g, '\u02AA')
                                   .replace(/lz/g, '\u02AB')
                                   .replace(/qp/g, '\u0239')
                                   .replace(/ts/g, '\u02A6');}
            },1)};
        outer.onkeypress = outer.onkeydown;
        outer.onkeyup = outer.onkeydown;
    }
}catch(e){console.warn(e)}},10);}

}catch(e){console.warn(e)}}
document.getElementsByClassName('is-hidden application js-app')[0].addEventListener('DOMNodeInserted', test);

console.log('Twixkit recieved');