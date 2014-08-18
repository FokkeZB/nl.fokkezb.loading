Alloy.Globals.top = (OS_IOS && parseInt(Ti.Platform.version[0], 10) >= 7) ? 20 : 0;
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");