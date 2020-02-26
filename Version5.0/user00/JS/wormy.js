function runWormy() {

    
    var i, j, Delay = 200,
        StartTime = 0,
        WormLen, MaxX = 30,
        MaxY = 20,
        nApples = 10,
        nBombs, nKeyDowns = 3;
    AppleX = new Array(nApples);
    AppleY = new Array(nApples);
    BombX = new Array(200);
    BombY = new Array(200);
    WormX = new Array(200);
    WormY = new Array(200);
    MoveX = new Array(nKeyDowns);
    MoveY = new Array(nKeyDowns);

    function KeyDown(whichkey) { //alert(whichkey);
        if (whichkey == 37) Move(-1, 0);
        if (whichkey == 38) Move(0, -1);
        if (whichkey == 39) Move(1, 0);
        if (whichkey == 40) Move(0, 1);

        if (whichkey == 50) Move(0, 1);
        if (whichkey == 52) Move(-1, 0);
        if (whichkey == 53) Move(0, 1);
        if (whichkey == 54) Move(1, 0);
        if (whichkey == 56) Move(0, -1);

        if (whichkey == 65458) Move(0, 1);
        if (whichkey == 65460) Move(-1, 0);
        if (whichkey == 65461) Move(0, 1);
        if (whichkey == 65462) Move(1, 0);
        if (whichkey == 65464) Move(0, -1);
    }

    function Move(xx, yy) {
        if (nKeyDowns > 2) return;
        if ((nKeyDowns == 0) &&
            (WormX[WormLen - 2] - WormX[WormLen - 1] == xx) &&
            (WormY[WormLen - 2] - WormY[WormLen - 1] == yy)) return;
        MoveX[nKeyDowns] = xx;
        MoveY[nKeyDowns] = yy;
        nKeyDowns++;
        if (StartTime > 0) return;
        var nn = new Date();
        StartTime = nn.getTime() / 1000;
        setTimeout("MoveWorm(" + xx + "," + yy + ")", Delay);
    }

    function MoveWorm(xx_old, yy_old) {
        var nn, ii, vv, ddx = xx_old,
            ddy = yy_old,
            xx, yy;
        if (StartTime == 0) return;
        if (nKeyDowns > 0) {
            ddx = MoveX[0];
            ddy = MoveY[0];
            for (nn = 1; nn < nKeyDowns; nn++) {
                MoveX[nn - 1] = MoveX[nn];
                MoveY[nn - 1] = MoveY[nn];
            }
            nKeyDowns--;
        }
        xx = WormX[WormLen - 1] + ddx;
        yy = WormY[WormLen - 1] + ddy;
        nn = WhatIsAt(xx, yy);
        if (nn < -1) //OffBoard, Worm, Bomb
        {
            if (nn == -4) window.document.images[MaxX * yy + xx].src = wormy_e.src;
            if (window.opener) {
                if (window.opener.SetHighscores) {
                    if (Delay == 300) window.opener.SetHighscores("Wormy", "slow", WormLen - 2, 1);
                    if (Delay == 200) window.opener.SetHighscores("Wormy", "medium", WormLen - 2, 1);
                    if (Delay == 100) window.opener.SetHighscores("Wormy", "fast", WormLen - 2, 1);
                }
            }
            if (WormLen < 9) alert("Oops, that was not much !");
            else alert("Super, you got " + eval(WormLen - 2) + " apples !");
            return;
        }
        if (nn >= 0) //Apple
        {
            window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_m.src;
            WormX[WormLen] = xx;
            WormY[WormLen] = yy;
            WormLen++;
            if (WormX[WormLen - 2] < WormX[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_hr.src;
            if (WormX[WormLen - 2] > WormX[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_hl.src;
            if (WormY[WormLen - 2] < WormY[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_hb.src;
            if (WormY[WormLen - 2] > WormY[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_ht.src;
            do {
                xx = random(MaxX);
                yy = random(MaxY);
                vv = true;
                for (ii = 0; ii < nBombs; ii++)
                    if ((xx == BombX[ii]) && (yy == BombY[ii])) vv = false;
                for (ii = 0; ii < nApples; ii++)
                    if ((xx == AppleX[ii]) && (yy == AppleY[ii])) vv = false;
                for (ii = 0; ii < WormLen; ii++)
                    if ((xx == WormX[ii]) && (yy == WormY[ii])) vv = false;
                if ((Math.abs(xx - WormX[WormLen - 1]) < 5) || (Math.abs(yy - WormY[ii]) < 5)) vv = false;
                if (vv) {
                    BombX[nBombs] = xx;
                    BombY[nBombs] = yy;
                    nBombs++;
                }
            }
            while (!vv);
            window.document.images[MaxX * yy + xx].src = wormy_b.src;
            do {
                xx = random(MaxX);
                yy = random(MaxY);
                vv = true;
                for (ii = 0; ii < nBombs; ii++)
                    if ((xx == BombX[ii]) && (yy == BombY[ii])) vv = false;
                for (ii = 0; ii < nApples; ii++)
                    if ((xx == AppleX[ii]) && (yy == AppleY[ii])) vv = false;
                for (ii = 0; ii < WormLen; ii++)
                    if ((xx == WormX[ii]) && (yy == WormY[ii])) vv = false;
                if ((Math.abs(xx - WormX[WormLen - 1]) < 5) || (Math.abs(yy - WormY[ii]) < 5)) vv = false;
                if (vv) {
                    AppleX[nn] = xx;
                    AppleY[nn] = yy;
                }
            }
            while (!vv);
            window.document.images[MaxX * yy + xx].src = wormy_a.src;
            document.forms[0].WormLength.value = WormLen;
        } else //Empty
        {
            window.document.images[MaxX * WormY[0] + WormX[0]].src = wormy_bg.src;
            for (nn = 1; nn < WormLen; nn++) {
                WormX[nn - 1] = WormX[nn];
                WormY[nn - 1] = WormY[nn];
            }
            WormX[WormLen - 1] = xx;
            WormY[WormLen - 1] = yy;
            if (WormLen > 2) window.document.images[MaxX * WormY[WormLen - 2] + WormX[WormLen - 2]].src = wormy_m.src;
            if (WormX[0] < WormX[1]) window.document.images[MaxX * WormY[0] + WormX[0]].src = wormy_tl.src;
            if (WormX[0] > WormX[1]) window.document.images[MaxX * WormY[0] + WormX[0]].src = wormy_tr.src;
            if (WormY[0] < WormY[1]) window.document.images[MaxX * WormY[0] + WormX[0]].src = wormy_tt.src;
            if (WormY[0] > WormY[1]) window.document.images[MaxX * WormY[0] + WormX[0]].src = wormy_tb.src;
            if (WormX[WormLen - 2] < WormX[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_hr.src;
            if (WormX[WormLen - 2] > WormX[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_hl.src;
            if (WormY[WormLen - 2] < WormY[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_hb.src;
            if (WormY[WormLen - 2] > WormY[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_ht.src;
        }
        nn = new Date();
        document.forms[0].EatSpeed.value = Math.round((WormLen - 2) / (nn.getTime() / 1000 - StartTime) * 100) / 10;
        setTimeout("MoveWorm(" + ddx + "," + ddy + ")", Delay);
    }

    function WhatIsAt(xx, yy) {
        var ii;
        if ((xx < 0) || (xx >= MaxX) || (yy < 0) || (yy >= MaxY)) return (-2);
        for (ii = 0; ii < WormLen; ii++)
            if ((xx == WormX[ii]) && (yy == WormY[ii])) return (-3);
        for (ii = 0; ii < nBombs; ii++)
            if ((xx == BombX[ii]) && (yy == BombY[ii])) return (-4);
        for (ii = 0; ii < nApples; ii++)
            if ((xx == AppleX[ii]) && (yy == AppleY[ii])) return (ii);
        return (-1);
    }

    function random(nn) {
        return (Math.floor(Math.random() * 1000) % nn);
    }

    function Init(newDelay) {
        var ii, jj, xx, yy, vv;
        if (newDelay > 0) Delay = newDelay;
        StartTime = 0;
        WormLen = 2;
        WormX[0] = 12;
        WormY[0] = 3;
        WormX[1] = 12;
        WormY[1] = 4;
        nKeyDowns = 0;
        nBombs = 0;
        while (nBombs < nApples) {
            xx = random(MaxX);
            yy = random(MaxY);
            vv = true;
            for (ii = 0; ii < nBombs; ii++)
                if ((xx == BombX[ii]) && (yy == BombY[ii])) vv = false;
            for (ii = 0; ii < WormLen; ii++)
                if ((xx == WormX[ii]) && (yy == WormY[ii])) vv = false;
            if ((Math.abs(xx - WormX[WormLen - 1]) < 5) || (Math.abs(yy - WormY[ii]) < 5)) vv = false;
            if (vv) {
                BombX[nBombs] = xx;
                BombY[nBombs] = yy;
                nBombs++;
            }
        }
        nApples = 0;
        while (nApples < nBombs) {
            xx = random(MaxX);
            yy = random(MaxY);
            vv = true;
            for (ii = 0; ii < nBombs; ii++)
                if ((xx == BombX[ii]) && (yy == BombY[ii])) vv = false;
            for (ii = 0; ii < nApples; ii++)
                if ((xx == AppleX[ii]) && (yy == AppleY[ii])) vv = false;
            for (ii = 0; ii < WormLen; ii++)
                if ((xx == WormX[ii]) && (yy == WormY[ii])) vv = false;
            if ((Math.abs(xx - WormX[WormLen - 1]) < 5) || (Math.abs(yy - WormY[ii]) < 5)) vv = false;
            if (vv) {
                AppleX[nApples] = xx;
                AppleY[nApples] = yy;
                nApples++;
            }
        }
        for (jj = 0; jj < MaxY; jj++) {
            for (ii = 0; ii < MaxX; ii++)
                window.document.images[MaxX * jj + ii].src = wormy_bg.src;
        }
        for (ii = 0; ii < nBombs; ii++)
            window.document.images[MaxX * BombY[ii] + BombX[ii]].src = wormy_b.src;
        for (ii = 0; ii < nApples; ii++)
            window.document.images[MaxX * AppleY[ii] + AppleX[ii]].src = wormy_a.src;
        if (WormX[0] < WormX[1]) window.document.images[MaxX * WormY[0] + WormX[0]].src = wormy_tl.src;
        if (WormX[0] > WormX[1]) window.document.images[MaxX * WormY[0] + WormX[0]].src = wormy_tr.src;
        if (WormY[0] < WormY[1]) window.document.images[MaxX * WormY[0] + WormX[0]].src = wormy_tt.src;
        if (WormY[0] > WormY[1]) window.document.images[MaxX * WormY[0] + WormX[0]].src = wormy_tb.src;
        if (WormX[WormLen - 2] < WormX[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_hr.src;
        if (WormX[WormLen - 2] > WormX[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_hl.src;
        if (WormY[WormLen - 2] < WormY[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_hb.src;
        if (WormY[WormLen - 2] > WormY[WormLen - 1]) window.document.images[MaxX * WormY[WormLen - 1] + WormX[WormLen - 1]].src = wormy_ht.src;
        document.forms[0].WormLength.value = 2;
        document.forms[0].EatSpeed.value = 0;
        document.forms[0].New.focus();
        document.forms[0].New.blur();
    }

    function ShowHelp() {
        alert("You are the worm. Eat the apples and avoid the bombs." +
            "\nDon't move over the border and don't eat yourself." +
            "\nMove by using the arrow keys. Good luck!");
        document.forms[0].New.focus();
        document.forms[0].New.blur();
    }
    if (navigator.appName != "Microsoft Internet Explorer") document.captureEvents(Event.KEYDOWN);
    document.onkeydown = NetscapeKeyDown;

    function NetscapeKeyDown(key) {
        KeyDown(key.which);
    }

        document.open("text/plain");
    for (j = 0; j < MaxY; j++) {
        for (i = 0; i < MaxX; i++)
            document.write("<IMG src=\"wormy_bg.gif\" border=0>");
        if (j < MaxY - 1) document.write("<BR>");
    }

    if (navigator.appName == "Konqueror") {
        document.write("</td></tr><tr><td colspan=4>");
        document.write("<input width=0 height=0 style=\"width:0; height:0\" name=\"KeyCatch\" onBlur=\"KeyCatchFocus()\" onKeyUp=\"KeyCatchChange()\">");
        KeyCatchFocus();
    }

    function KeyCatchFocus() {
        setTimeout("document.forms[0].KeyCatch.focus()", 100);
    }

    function KeyCatchChange() {
        var vv = "" + document.forms[0].KeyCatch.value;
        if (vv == "") return;
        KeyDown(vv.charCodeAt(0));
        document.forms[0].KeyCatch.value = "";
    }

    document.close();

    
}
