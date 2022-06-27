const CryptoJS = require("crypto-js");

const re= CryptoJS.AES.decrypt("U2FsdGVkX1+rzj3XhDayVXvgULbwyR+4lkkTe24L+3kdgsmtrHe6LW5Tr9LA0ltpUmC8gM51glG9FGP88i3shrlxLllfrRANJex3I6x+nzkTdCMF0Pr4nxsRuYxODYNPxNM4hAecmMmEEEO/wrU2PiFvooayA02dq9Zlm7dpzEbB2TEnD3loRuE40v1Xv0v7jymLX2lJEFrbUOIo87klsORiqhIqG+oW3p9PmdLNc+7/HY+y+4WtJNi3qOum+phEdliS6UhplP6flueZc6oD6oSG1rW5TB1hJtz4rVfr3zv8gA04lwoMT0Uojobolx9tyhi0NxWwau5VZQYPl4O7e9El4Dt2v+y81NKitCOtYbc=", "123");
var originalText = re.toString(CryptoJS.enc.Utf8);

console.log(originalText); 