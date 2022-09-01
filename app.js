function move(brojac) {
    var elem = document.getElementById("myBar");
    var width = brojac;
    brojac += 20;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= brojac) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
}

//Drinks controller ('Model')
var drinksController = (function () {
    class Men {
        constructor(name, drunkenness) {
            this.name = name;
            this.drunkenness = drunkenness;
        }
    }

    const Bottle = function (id, name, numberOfDrinks) {
        this.id = id;
        this.name = name;
        this.numberOfDrinks = numberOfDrinks;
    }

    let data = {
        bottles: [],
        drunkenness: 0
    }

    const fillBottles = function () {
        newItem = new Bottle(1, `Margarita`, 3);
        data.bottles.push(newItem);
        newItem = new Bottle(2, `Mojito`, 3);
        data.bottles.push(newItem);
        newItem = new Bottle(3, `Sex On The Beach`, 3);
        data.bottles.push(newItem);
        newItem = new Bottle(4, `Pina Colada`, 3);
        data.bottles.push(newItem);
        newItem = new Bottle(5, `Cuba Libre`, 3);
        data.bottles.push(newItem);
    }

    const increaseDrunkenness = function () {
        data.drunkenness = data.drunkenness + 20;
    }

    return {
        getBottles: function () {
            if (data.bottles.length == 0) {
                fillBottles();
            }
            return data.bottles
        },
        drink: function (id) {
            let flag = false;
            if (data.drunkenness < 100) {
                console.log(id);
                data.bottles.forEach(element => {
                    if (element.id == id && element.numberOfDrinks != 0) {
                        console.log("Uslo u petlju!");
                        element.numberOfDrinks = element.numberOfDrinks - 1;
                        increaseDrunkenness();
                        console.log(data.drunkenness);
                        flag = true;
                    }
                });
            }
            return flag;
        },
        getDrunkenness: function () {
            return data.drunkenness
        }
    }
})();

//UI controller ('View')
var UIController = (function () {
    return {
        displayBottles: function (arrayOfBottles) {
            let html = `<label for="drinks">Choose a coctail:</label>
            <select name="drinks" id="drinks">`;
            arrayOfBottles.forEach(element => {
                html += `<option value=${element.id}>${element.name} (${element.numberOfDrinks})</option>`;
            });
            html += `</select>`;
            document.querySelector(".drink-selector").innerHTML = html;
        },
        getDrink: function () {
            return parseInt(document.getElementById("drinks").value);
        },
        getDrink2: function () {
            return document.getElementById("drinks").options[document.getElementById("drinks").selectedIndex].text.split('(')[0];
        },
        move: function (brojac) {
            var elem = document.getElementById("myBar");
            var width = brojac;
            var id = setInterval(frame, 10);
            function frame() {
                if (width >= brojac) {
                    clearInterval(id);
                } else {
                    width++;
                    elem.style.width = width + '%';
                    elem.innerHTML = width * 1 + '%';
                }
            }
        },
        displayPics: function (drunkenness) {
            document.querySelector(".pic").innerHTML = `<img src="${drunkenness / 20 + 1}d.png" alt="not drunk at all" />`;
        }
    }
})();

//global app controller ('Controller')
var controller = (function (drinksCTRL, UICTRL) {
    let setupListeners = function () {
        document.querySelector("#drinks").addEventListener("change", gettingDrunk);
    }

    let updateBottles = function () {
        let bottles = drinksCTRL.getBottles();
        UICTRL.displayBottles(bottles);
    }

    let gettingDrunk = function () {

        if (drinksController.getDrunkenness() < 80) {
            id = UICTRL.getDrink();
            if (drinksController.drink(id)) {
                move(drinksController.getDrunkenness());
                updateBottles();
                setupListeners();
                let drunkenness = drinksCTRL.getDrunkenness();
                UICTRL.displayPics(drunkenness);
            }
            else {
                drinkName = UICTRL.getDrink2();
                alert("You already drank all " + drinkName);
            }
        } else {
            alert("Already drunk, go home");
        }
    }

    return {
        init: function () {
            let bottles = drinksCTRL.getBottles();
            UICTRL.displayBottles(bottles);
            setupListeners();
        }
    }
})(drinksController, UIController);

controller.init();