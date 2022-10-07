// google Random Characters Transition
function generateRandomString(length) {
    let codeletters = "A B C D E F G H I K L M N O P Q R S T V X Y Z";
    let random_text = '';
    while (random_text.length < length) {
        random_text += codeletters.charAt(Math.floor(Math.random() * codeletters.length));
    }
    return random_text;
}

function animateWrong(element){
    // play scrambling sound
    const head = element.text();
    const tl = gsap.timeline();
    for (let i = 0; i < 50; i++) {
        tl.to(element,{innerText: head + generateRandomString(6), duration: 0.02});
    }
    tl.set(element,{innerText: head, duration: 0.02});
    // play wrong sound
    tl.add(function () {
        const starting_colour = element.css("backgroundColor");
        const blink = gsap.timeline();
        for (let i = 0; i < 3; i++) {
            blink.to(element, {background: "red", duration: 0.1, ease:"power1"})
            blink.to(element, {background: starting_colour, duration: 0.1, ease:"power1"})
        }
        return blink;
    }, "-=0.3")
}

const Messenger = function (el) {
    'use strict';
    const m = this;

    m.init = function () {
        m.codeletters = "A B C D E F G H I K L M N O P Q R S T V X Y Z";
        m.message = 0;
        m.current_length = 0;
        m.fadeBuffer = false;
        m.target = "microbio";
    };

    m.animateIn = function () {
        if (m.current_length < m.target.length) {
            m.current_length = m.current_length + 2;
            if (m.current_length > m.target.length) {
                m.current_length = m.target.length;
            }

            var message = m.generateRandomString(m.current_length);
            $(el).html(message);

            setTimeout(m.animateIn, 20);
        } else {
            setTimeout(m.animateFadeBuffer, 20);
        }
    };

    m.animateFadeBuffer = function () {
        let i;
        if (m.fadeBuffer === false) {
            m.fadeBuffer = [];
            for (i = 0; i < m.target.length; i++) {
                m.fadeBuffer.push({c: (Math.floor(Math.random() * 12)) + 1, l: m.target.charAt(i)});
            }
        }
        var message = '';

        for (i = 0; i < m.fadeBuffer.length; i++) {
            var fader = m.fadeBuffer[i];
            if (fader.c > 0) {
                fader.c--;
                message += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
            } else {
                message += fader.l;
            }
        }

        $(el).html(message);
        
    };
    m.init();
};
$(function (){
    element = $("#messenger");
    //animateWrong(element);
});
