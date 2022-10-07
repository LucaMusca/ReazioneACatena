let classifica;
const timeline = gsap.timeline();
const vert_mov = 142;
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function compare( a, b ) {
    return b.value - a.value;
}

function animateNumber(entry, endpoint){
    const stagger = 20;
    timeline.set(entry.tagvalue, {textContent: entry._value}); // to remove commas
    timeline.to(entry.tagvalue, {
        textContent: endpoint,
        duration: 0.8, //TODO
        ease: "power1.in",
        snap: { textContent: stagger },
        stagger: {
            each: 1.0,
            onUpdate: function() {
                this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));},
        },
        onComplete: function () {
            gsap.set(entry.tagvalue, {textContent: numberWithCommas(Math.ceil(endpoint))});
        }
    });
}

class EntryClassifica {
    constructor(name, display_name, classifica) {
        this.name = name;
        this.display_name = display_name;
        this._value = 0;
        this.classifica = classifica;
        this.position = classifica.entries.length;
        classifica.entries.push(this);
        classifica.div.append(this.text());

        this.tag = $(`#${name}`);
        this.tagvalue = $(`#${name}-value`);
    }

    get value(){
        return this._value;
    }

    set value(v) {
        animateNumber(this, v);
        this._value = v;
        this.classifica.update(this);
    }
    text(){
        return `<div class='entry field' id='${this.name}'>${this.display_name}
                <span class="entry-value" id='${this.name}-value'>${this._value}</span>€</div>`
    }
}

$(function () {
   classifica = {
       div: $("#classifica"),
       entries: [],
       push: function (name) {
           this[name] = new EntryClassifica(name, name, this); //TODO: change here when you implement display_name
       },
        update: function (entry){
           const new_array = classifica.entries.map(x => x);
            new_array.sort(compare);
            console.log(new_array);
            timeline.to({},{}); 
            new_array.forEach((e, i) => {
                if (e.name === entry.name)
                    e.tag.css({"z-index": "2"});
                else
                    e.tag.css({"z-index": "1"});
                const diff = i - e.position;
                e.position = i;
                timeline.to(e.tag, {y: "+=" + diff * vert_mov, duration: 1}, "<");
            })
        }};
   classifica.div.append(`<div class='titolo-classifica'>Classifica</div>`);
   classifica.push("ciao");
   classifica.ciao.value = 1456;
    classifica.push("coso");
    classifica.coso.value = 2230;
    classifica.push("alissa");
    classifica.alissa.value = 3230;
})