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
                data.bottles.forEach(element => {
                    if (element.id == id && element.numberOfDrinks != 0) {
                        element.numberOfDrinks = element.numberOfDrinks - 1;
                        increaseDrunkenness();
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
            let html = `<select name="drinks" id="drinks"><option value="" selected disabled hidden>Look for your fav cocktail here</option>`;
            arrayOfBottles.forEach(element => {
                html += `<option value=${element.id}>${element.name} (${element.numberOfDrinks})</option>`;
            });
            html += `</select>`;
            document.querySelector(".drink-selector").innerHTML = html;
        },
        getDrink: function () {
            return parseInt(document.getElementById("drinks").value);
        },
        yourDrinks: function () {
            drinkName = document.getElementById("drinks").options[document.getElementById("drinks").selectedIndex].text.split('(')[0];
            const drink = document.createElement("li");
            drink.innerHTML = drinkName;
            document.querySelector(".drinks-diary ul").appendChild(drink);
        },
        noDrinksLeftInTheBottle: function () {
            drinkName = document.getElementById("drinks").options[document.getElementById("drinks").selectedIndex].text.split('(')[0];
            alert("You already drank all " + drinkName);
        },
        alreadyDrunk: function () {
            alert("Already drunk, go home");
        },
        move: function (drunkenness) {
            var elem = document.getElementById("myBar");
            var width = 0;
            var id = setInterval(frame, 10);
            function frame() {
                if (width >= drunkenness) {
                    clearInterval(id);
                } else {
                    width++;
                    elem.style.width = width + '%';
                    elem.innerHTML = width * 1 + '%';
                    if (drunkenness > 60) {
                        elem.setAttribute('class', 'w3-container w3-red w3-center');
                    } else if (drunkenness > 20) {
                        elem.setAttribute('class', 'w3-container w3-blue w3-center');
                    }
                }
            }
        },
        displayPics: function (drunkenness) {
            switch (drunkenness) {
                case 20:
                    document.querySelector(".pic").innerHTML = `<img src="${drunkenness / 20}d.png" alt="not-drunk-at-all" /><h2>Not drunk at all</h2>`;
                    break;
                case 40:
                    document.querySelector(".pic").innerHTML = `<img src="${drunkenness / 20}d.png" alt="get-this-party-started" /><h2>Get this party started</h2>`;
                    break;
                case 60:
                    document.querySelector(".pic").innerHTML = `<img src="${drunkenness / 20}d.png" alt="lets-dance" /><h2>Let's dance</h2>`;
                    break;
                case 80:
                    document.querySelector(".pic").innerHTML = `<img src="${drunkenness / 20}d.png" alt="ciganine-ti-sto-sviras" /><h2>Ciganine ti sto sviras</h2>`;
                    break;
                case 100:
                    document.querySelector(".pic").innerHTML = `<img src="${drunkenness / 20}d.png" alt="maybe-i-should-get-some-help" /><h2>Maybe you should get some help</h2>`;
                    break;
            }
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
        if (drinksController.getDrunkenness() < 100) {
            id = UICTRL.getDrink();
            if (drinksController.drink(id)) {
                UICTRL.yourDrinks();
                UICTRL.move(drinksController.getDrunkenness());
                updateBottles();
                setupListeners();
                let drunkenness = drinksCTRL.getDrunkenness();
                UICTRL.displayPics(drunkenness);
            }
            else {
                UICTRL.noDrinksLeftInTheBottle();
            }
        } else {
            UICTRL.alreadyDrunk();
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