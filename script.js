let mySiema = new Siema({
            selector: ".mySiema",
        });

        document.querySelector(".js-prev").addEventListener("click", function () {
            mySiema.prev();
        });

        document.querySelector(".js-next").addEventListener("click", function () {
            mySiema.next();
        });

        // time

        const checkTime = i => {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        };

        const startTime = () => {
            var today = new Date();
            var hrs = today.getHours();
            var min = today.getMinutes();
            // add a zero in front of numbers<10
            hrs = checkTime(hrs);
            min = checkTime(min);
            document.getElementById("display-time").innerHTML = hrs + ":" + min;
            document.getElementById("locked-display-time").innerHTML = hrs + ":" + min;
            setTimeout(function () {
                startTime()
            }, 500);
        };

        startTime();

        // BACKGROUNDS

        const backgroundImages = ["url('assets/img/backgrounds/picture1.jpg')",
            "url('assets/img/backgrounds/picture2.jpg')",
            "url('assets/img/backgrounds/picture3.jpg')",
            "url('assets/img/backgrounds/picture4.jpg')",
            "url('assets/img/backgrounds/picture5.jpg')",
            "url('assets/img/backgrounds/picture6.jpg')",
            "url('assets/img/backgrounds/picture7.jpg')",
            "url('assets/img/backgrounds/picture8.jpg')",
            "url('assets/img/backgrounds/picture9.jpg')",
            "url('assets/img/backgrounds/picture10.jpg')"];
        const displayBackground = document.querySelectorAll(".background-image");
        const backgroundUp = document.querySelector(".background-up-btn");
        const backgroundDown = document.querySelector(".background-down-btn");

        let image;

        for (let j = 0; j < 3; j++) {
            image = 0;
            displayBackground[j].style.backgroundImage = backgroundImages[image];
        }

        const changeBackgroundDown = () => {
            if (image > 0) {
                displayBackground[0].style.backgroundImage = backgroundImages[image -= 1];
                image += 1;
                displayBackground[1].style.backgroundImage = backgroundImages[image -= 1];
                image += 1;
                displayBackground[2].style.backgroundImage = backgroundImages[image -= 1];
            } else {
                displayBackground[0].style.backgroundImage = backgroundImages[0];
                displayBackground[1].style.backgroundImage = backgroundImages[0];
                displayBackground[2].style.backgroundImage = backgroundImages[0];
            }
        };

        const changeBackgroundUp = () => {
            if (image < 9) {
                displayBackground[0].style.backgroundImage = backgroundImages[image += 1];
                image -= 1;
                displayBackground[1].style.backgroundImage = backgroundImages[image += 1];
                image -= 1;
                displayBackground[2].style.backgroundImage = backgroundImages[image += 1];
            } else {
                displayBackground[0].style.backgroundImage = backgroundImages[9];
                displayBackground[1].style.backgroundImage = backgroundImages[9];
                displayBackground[2].style.backgroundImage = backgroundImages[9];
            }
        };

        backgroundUp.addEventListener("click", changeBackgroundUp);
        backgroundDown.addEventListener("click", changeBackgroundDown);

        // lock/unlock button

        const lockedDisplay = document.querySelector("#locked-display");
        const display = document.querySelector("#display");
        const insertPin = document.querySelector("#insert-pin");
        const pin = document.querySelector("#user-pin");
        const lockButton = document.querySelector("#lock-btn");
        const lockDevice = () => {
            if (lockedDisplay.style.display === "flex") {
                lockedDisplay.style.display = "none";
                insertPin.style.display = "flex";
                display.style.display = "none";
            } else if (insertPin.style.display === "flex") {
                false;
            }
            else {
                lockedDisplay.style.display = "flex";
                display.style.display = "none";
            }
        };


        lockButton.addEventListener("click", lockDevice);

        lockedDisplay.addEventListener("click", function () {
            lockedDisplay.style.display = "none";
            insertPin.style.display = "flex";
        });

        // insert pin

        const validatePIN = "1234";
        const popUp = document.querySelector("#pop-up-pin");
        const submitButton = document.querySelector("#submit-pin");

        pin.addEventListener("click", function () {
            pin.value = "";
            pin.style.backgroundColor = "#fff";
        })

        submitButton.addEventListener("click", function (e) {
            if (pin.value === validatePIN) {
                insertPin.style.display = "none";
                display.style.display = "block";
            } else if (pin.value.length < 4) {
                pin.animate([
                    {transform: 'translateX(-3px)'},
                    {transform: 'translateX(3px)'},
                    {transform: 'translateX(-3px)'},
                    {transform: 'translateX(3px)'}
                ], {
                    duration: 200,
                    iterations: 1
                });
            } else {
                popUp.style.display = "flex";
            }
            e.preventDefault();
        });

        popUp.addEventListener("click", function () {
            popUp.style.display = "none";
        });

        // PIN CODE COIN

        const pinClue = document.querySelector(".pin-clue");
        pinClue.addEventListener("click", function () {

            if (pinClue.firstElementChild.innerHTML !== "1234") {
                pinClue.animate([
                    {transform: 'rotate3d(1, 1, 0, 0deg)'},
                    {transform: 'rotate3d(1, 1, 0, -180deg)'},
                    {transform: 'rotate3d(1, 1, 0, -360deg)'}
                ], {
                    duration: 150,
                    iterations: 1
                });
                pinClue.firstElementChild.innerHTML = "1234";
            } else {
                pinClue.animate([
                    {transform: 'rotate3d(1, 1, 0, 0deg)'},
                    {transform: 'rotate3d(1, 1, 0, -180deg)'},
                    {transform: 'rotate3d(1, 1, 0, -360deg)'}
                ], {
                    duration: 200,
                    iterations: 1
                });
                pinClue.firstElementChild.innerHTML = "PIN <br>code";
            }
        });

        // BATTERY

        const batteryTop = document.querySelectorAll(".battery");
        const batteryLockedDisplay = document.querySelector("#battery-locked-display");
        const lowBatteryPopUp = document.querySelector("#pop-up-battery");
        batteryTop[0].innerHTML = "100";
        batteryTop[1].innerHTML = "100";
        batteryLockedDisplay.innerHTML = "100";
        setInterval(function () {
            batteryLockedDisplay.innerHTML -= 1;
            batteryTop[0].innerHTML -= 1;
            batteryTop[1].innerHTML -= 1;

            if (batteryLockedDisplay.innerHTML < 1 && batteryTop[0].innerHTML < 1 && batteryTop[1].innerHTML < 1) {
                batteryLockedDisplay.innerHTML = "0"
                lockedDisplay.style.display = "none";
                display.style.display = "none";
                insertPin.style.display = "none";
                lowBatteryPopUp.style.display = "flex";
                lockButton.removeEventListener("click", lockDevice);
            }
            if (batteryLockedDisplay.innerHTML < 30 && batteryTop[0].innerHTML < 30 && batteryTop[1].innerHTML < 30) {
                document.querySelectorAll(".fa-battery-half")[0].classList.add("fa-battery-quarter");
                document.querySelectorAll(".fa-battery-half")[0].classList.remove("fa-battery-half");
            }
            if (batteryLockedDisplay.innerHTML < 55 && batteryTop[0].innerHTML < 55 && batteryTop[1].innerHTML < 55) {
                document.querySelectorAll(".fa-battery-three-quarters")[0].classList.add("fa-battery-half");
                document.querySelectorAll(".fa-battery-three-quarters")[0].classList.remove("fa-battery-three-quarters");
            }
            if (batteryLockedDisplay.innerHTML < 80 && batteryTop[0].innerHTML < 80 && batteryTop[1].innerHTML < 80) {
                document.querySelectorAll(".fa-battery-full")[0].classList.add("fa-battery-three-quarters");
                document.querySelectorAll(".fa-battery-full")[0].classList.remove("fa-battery-full");
            }
        }, 1000);

        // APPs

        const slack = document.querySelector(".slack");
        const slackYes = document.querySelector(".slack-yes");
        const slackNo = document.querySelector(".slack-no");

        const leo = document.querySelector(".leo");
        const leoYes = document.querySelector(".leo-yes");
        const leoNo = document.querySelector(".leo-no");

        const uber = document.querySelector(".uber");
        const uberYes = document.querySelector(".uber-yes");
        const uberNo = document.querySelector(".uber-no");

        const bvg = document.querySelector(".bvg");
        const bvgYes = document.querySelector(".bvg-yes");
        const bvgNo = document.querySelector(".bvg-no");

        const whatsapp = document.querySelector(".whatsapp");
        const whatsappYes = document.querySelector(".whatsapp-yes");
        const whatsappNo = document.querySelector(".whatsapp-no");

        const facebook = document.querySelector(".facebook");
        const facebookYes = document.querySelector(".facebook-yes");
        const facebookNo = document.querySelector(".facebook-no");

        const twitter = document.querySelector(".twitter");
        const twitterYes = document.querySelector(".twitter-yes");
        const twitterNo = document.querySelector(".twitter-no");

        const instagram = document.querySelector(".instagram");
        const instagramYes = document.querySelector(".instagram-yes");
        const instagramNo = document.querySelector(".instagram-no");

        const paypal = document.querySelector(".paypal");
        const paypalYes = document.querySelector(".paypal-yes");
        const paypalNo = document.querySelector(".paypal-no");

        const youtube = document.querySelector(".youtube");
        const youtubeYes = document.querySelector(".youtube-yes");
        const youtubeNo = document.querySelector(".youtube-no");

        const bank = document.querySelector(".bank");
        const bankYes = document.querySelector(".bank-yes");
        const bankNo = document.querySelector(".bank-no");

        const livescore = document.querySelector(".livescore");
        const livescoreYes = document.querySelector(".livescore-yes");
        const livescoreNo = document.querySelector(".livescore-no");

        const drivenow = document.querySelector(".drivenow");
        const drivenowYes = document.querySelector(".drivenow-yes");
        const drivenowNo = document.querySelector(".drivenow-no");

        const calculator = document.querySelector(".calculator");
        const calculatorYes = document.querySelector(".calculator-yes");
        const calculatorNo = document.querySelector(".calculator-no");

        const notes = document.querySelector(".notes");
        const notesYes = document.querySelector(".notes-yes");
        const notesNo = document.querySelector(".notes-no");

        const alarm = document.querySelector(".alarm");
        const alarmYes = document.querySelector(".alarm-yes");
        const alarmNo = document.querySelector(".alarm-no");

        // UNINSTALL APP

        const showUninstallMenu = appName => {
            appName.firstElementChild.style.display = "flex";
        };
        const yesUninstall = appYes => {
            appYes.parentElement.parentElement.parentElement.style.visibility = "hidden";
        };
        const notUninstall = appNo => {
            appNo.parentElement.parentElement.style.visibility = "hidden";z
        };

        slack.addEventListener("dblclick", function () {
            showUninstallMenu(slack);
        });
        slackYes.addEventListener("click", function () {
            yesUninstall(slackYes);
        });
        slackNo.addEventListener("click", function () {
            notUninstall(slackNo);
        });

        leo.addEventListener("dblclick", function () {
            showUninstallMenu(leo);
        });
        leoYes.addEventListener("click", function () {
            yesUninstall(leoYes);
        });
        leoNo.addEventListener("click", function () {
            notUninstall(leoNo);
        });

        uber.addEventListener("dblclick", function () {
            showUninstallMenu(uber);
        });
        uberYes.addEventListener("click", function () {
            yesUninstall(uberYes);
        });
        uberNo.addEventListener("click", function () {
            notUninstall(uberNo);
        });

        bvg.addEventListener("dblclick", function () {
            showUninstallMenu(bvg);
        });
        bvgYes.addEventListener("click", function () {
            yesUninstall(bvgYes);
        });
        bvgNo.addEventListener("click", function () {
            notUninstall(bvgNo);
        });

        whatsapp.addEventListener("dblclick", function () {
            showUninstallMenu(whatsapp);
        });
        whatsappYes.addEventListener("click", function () {
            yesUninstall(whatsappYes);
        });
        whatsappNo.addEventListener("click", function () {
            notUninstall(whatsappNo);
        });

        facebook.addEventListener("dblclick", function () {
            showUninstallMenu(facebook);
        });
        facebookYes.addEventListener("click", function () {
            yesUninstall(facebookYes);
        });
        facebookNo.addEventListener("click", function () {
            notUninstall(facebookNo);
        });

        twitter.addEventListener("dblclick", function () {
            showUninstallMenu(twitter);
        });
        twitterYes.addEventListener("click", function () {
            yesUninstall(twitterYes);
        });
        twitterNo.addEventListener("click", function () {
            notUninstall(twitterNo);
        });

        instagram.addEventListener("dblclick", function () {
            showUninstallMenu(instagram);
        });
        instagramYes.addEventListener("click", function () {
            yesUninstall(instagramYes);
        });
        instagramNo.addEventListener("click", function () {
            notUninstall(instagramNo);
        });

        paypal.addEventListener("dblclick", function () {
            showUninstallMenu(paypal);
        });
        paypalYes.addEventListener("click", function () {
            yesUninstall(paypalYes);
        });
        paypalNo.addEventListener("click", function () {
            notUninstall(paypalNo);
        });

        youtube.addEventListener("dblclick", function () {
            showUninstallMenu(youtube);
        });
        youtubeYes.addEventListener("click", function () {
            yesUninstall(youtubeYes);
        });
        youtubeNo.addEventListener("click", function () {
            notUninstall(youtubeNo);
        });

        bank.addEventListener("dblclick", function () {
            showUninstallMenu(bank);
        });
        bankYes.addEventListener("click", function () {
            yesUninstall(bankYes);
        });
        bankNo.addEventListener("click", function () {
            notUninstall(bankNo);
        });

        livescore.addEventListener("dblclick", function () {
            showUninstallMenu(livescore);
        });
        livescoreYes.addEventListener("click", function () {
            yesUninstall(livescoreYes);
        });
        livescoreNo.addEventListener("click", function () {
            notUninstall(livescoreNo);
        });

        drivenow.addEventListener("dblclick", function () {
            showUninstallMenu(drivenow);
        });
        drivenowYes.addEventListener("click", function () {
            yesUninstall(drivenowYes);
        });
        drivenowNo.addEventListener("click", function () {
            notUninstall(drivenowNo);
        });

        calculator.addEventListener("dblclick", function () {
            showUninstallMenu(calculator);
        });
        calculatorYes.addEventListener("click", function () {
            yesUninstall(calculatorYes);
        });
        calculatorNo.addEventListener("click", function () {
            notUninstall(calculatorNo);
        });

        notes.addEventListener("dblclick", function () {
            showUninstallMenu(notes);
        });
        notesYes.addEventListener("click", function () {
            yesUninstall(notesYes);
        });
        notesNo.addEventListener("click", function () {
            notUninstall(notesNo);
        });

        alarm.addEventListener("dblclick", function () {
            showUninstallMenu(alarm);
        });
        alarmYes.addEventListener("click", function () {
            yesUninstall(alarmYes);
        });
        alarmNo.addEventListener("click", function () {
            notUninstall(alarmNo);
        });