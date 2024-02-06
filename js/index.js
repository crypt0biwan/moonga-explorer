const artist_select = document.querySelector('#artists')

let data = null
let sog_data = null
let core_sets = []
let extensions = []

const get_data = async () => {
    const resp = await fetch('./moonga.json')
    data = await resp.json()

    const resp_sog = await fetch('./sog.json')
    sog_data = (await resp_sog.json()).data

    _.orderBy(_.uniqBy(data, 'artist'), [entry => entry.artist.toLowerCase()], ['asc']).forEach(entry => {
        if(entry.artist !== '') {
            artist_select.innerHTML += `<option value="${entry.artist}">${entry.artist}</option>`
        }
    })

    return data
}

let Latinise = {
    latin_map: {
        "Á":"A",
        "Ă":"A",
        "Ắ":"A",
        "Ặ":"A",
        "Ằ":"A",
        "Ẳ":"A",
        "Ẵ":"A",
        "Ǎ":"A",
        "Â":"A",
        "Ấ":"A",
        "Ậ":"A",
        "Ầ":"A",
        "Ẩ":"A",
        "Ẫ":"A",
        "Ä":"A",
        "Ǟ":"A",
        "Ȧ":"A",
        "Ǡ":"A",
        "Ạ":"A",
        "Ȁ":"A",
        "À":"A",
        "Ả":"A",
        "Ȃ":"A",
        "Ā":"A",
        "Ą":"A",
        "Å":"A",
        "Ǻ":"A",
        "Ḁ":"A",
        "Ⱥ":"A",
        "Ã":"A",
        "Ꜳ":"AA",
        "Æ":"AE",
        "Ǽ":"AE",
        "Ǣ":"AE",
        "Ꜵ":"AO",
        "Ꜷ":"AU",
        "Ꜹ":"AV",
        "Ꜻ":"AV",
        "Ꜽ":"AY",
        "Ḃ":"B",
        "Ḅ":"B",
        "Ɓ":"B",
        "Ḇ":"B",
        "Ƀ":"B",
        "Ƃ":"B",
        "Ć":"C",
        "Č":"C",
        "Ç":"C",
        "Ḉ":"C",
        "Ĉ":"C",
        "Ċ":"C",
        "Ƈ":"C",
        "Ȼ":"C",
        "Ď":"D",
        "Ḑ":"D",
        "Ḓ":"D",
        "Ḋ":"D",
        "Ḍ":"D",
        "Ɗ":"D",
        "Ḏ":"D",
        "ǲ":"D",
        "ǅ":"D",
        "Đ":"D",
        "Ƌ":"D",
        "Ǳ":"DZ",
        "Ǆ":"DZ",
        "É":"E",
        "Ĕ":"E",
        "Ě":"E",
        "Ȩ":"E",
        "Ḝ":"E",
        "Ê":"E",
        "Ế":"E",
        "Ệ":"E",
        "Ề":"E",
        "Ể":"E",
        "Ễ":"E",
        "Ḙ":"E",
        "Ë":"E",
        "Ė":"E",
        "Ẹ":"E",
        "Ȅ":"E",
        "È":"E",
        "Ẻ":"E",
        "Ȇ":"E",
        "Ē":"E",
        "Ḗ":"E",
        "Ḕ":"E",
        "Ę":"E",
        "Ɇ":"E",
        "Ẽ":"E",
        "Ḛ":"E",
        "Ꝫ":"ET",
        "Ḟ":"F",
        "Ƒ":"F",
        "Ǵ":"G",
        "Ğ":"G",
        "Ǧ":"G",
        "Ģ":"G",
        "Ĝ":"G",
        "Ġ":"G",
        "Ɠ":"G",
        "Ḡ":"G",
        "Ǥ":"G",
        "Ḫ":"H",
        "Ȟ":"H",
        "Ḩ":"H",
        "Ĥ":"H",
        "Ⱨ":"H",
        "Ḧ":"H",
        "Ḣ":"H",
        "Ḥ":"H",
        "Ħ":"H",
        "Í":"I",
        "Ĭ":"I",
        "Ǐ":"I",
        "Î":"I",
        "Ï":"I",
        "Ḯ":"I",
        "İ":"I",
        "Ị":"I",
        "Ȉ":"I",
        "Ì":"I",
        "Ỉ":"I",
        "Ȋ":"I",
        "Ī":"I",
        "Į":"I",
        "Ɨ":"I",
        "Ĩ":"I",
        "Ḭ":"I",
        "Ꝺ":"D",
        "Ꝼ":"F",
        "Ᵹ":"G",
        "Ꞃ":"R",
        "Ꞅ":"S",
        "Ꞇ":"T",
        "Ꝭ":"IS",
        "Ĵ":"J",
        "Ɉ":"J",
        "Ḱ":"K",
        "Ǩ":"K",
        "Ķ":"K",
        "Ⱪ":"K",
        "Ꝃ":"K",
        "Ḳ":"K",
        "Ƙ":"K",
        "Ḵ":"K",
        "Ꝁ":"K",
        "Ꝅ":"K",
        "Ĺ":"L",
        "Ƚ":"L",
        "Ľ":"L",
        "Ļ":"L",
        "Ḽ":"L",
        "Ḷ":"L",
        "Ḹ":"L",
        "Ⱡ":"L",
        "Ꝉ":"L",
        "Ḻ":"L",
        "Ŀ":"L",
        "Ɫ":"L",
        "ǈ":"L",
        "Ł":"L",
        "Ǉ":"LJ",
        "Ḿ":"M",
        "Ṁ":"M",
        "Ṃ":"M",
        "Ɱ":"M",
        "Ń":"N",
        "Ň":"N",
        "Ņ":"N",
        "Ṋ":"N",
        "Ṅ":"N",
        "Ṇ":"N",
        "Ǹ":"N",
        "Ɲ":"N",
        "Ṉ":"N",
        "Ƞ":"N",
        "ǋ":"N",
        "Ñ":"N",
        "Ǌ":"NJ",
        "Ó":"O",
        "Ŏ":"O",
        "Ǒ":"O",
        "Ô":"O",
        "Ố":"O",
        "Ộ":"O",
        "Ồ":"O",
        "Ổ":"O",
        "Ỗ":"O",
        "Ö":"O",
        "Ȫ":"O",
        "Ȯ":"O",
        "Ȱ":"O",
        "Ọ":"O",
        "Ő":"O",
        "Ȍ":"O",
        "Ò":"O",
        "Ỏ":"O",
        "Ơ":"O",
        "Ớ":"O",
        "Ợ":"O",
        "Ờ":"O",
        "Ở":"O",
        "Ỡ":"O",
        "Ȏ":"O",
        "Ꝋ":"O",
        "Ꝍ":"O",
        "Ō":"O",
        "Ṓ":"O",
        "Ṑ":"O",
        "Ɵ":"O",
        "Ǫ":"O",
        "Ǭ":"O",
        "Ø":"O",
        "Ǿ":"O",
        "Õ":"O",
        "Ṍ":"O",
        "Ṏ":"O",
        "Ȭ":"O",
        "Ƣ":"OI",
        "Ꝏ":"OO",
        "Ɛ":"E",
        "Ɔ":"O",
        "Ȣ":"OU",
        "Ṕ":"P",
        "Ṗ":"P",
        "Ꝓ":"P",
        "Ƥ":"P",
        "Ꝕ":"P",
        "Ᵽ":"P",
        "Ꝑ":"P",
        "Ꝙ":"Q",
        "Ꝗ":"Q",
        "Ŕ":"R",
        "Ř":"R",
        "Ŗ":"R",
        "Ṙ":"R",
        "Ṛ":"R",
        "Ṝ":"R",
        "Ȑ":"R",
        "Ȓ":"R",
        "Ṟ":"R",
        "Ɍ":"R",
        "Ɽ":"R",
        "Ꜿ":"C",
        "Ǝ":"E",
        "Ś":"S",
        "Ṥ":"S",
        "Š":"S",
        "Ṧ":"S",
        "Ş":"S",
        "Ŝ":"S",
        "Ș":"S",
        "Ṡ":"S",
        "Ṣ":"S",
        "Ṩ":"S",
        "Ť":"T",
        "Ţ":"T",
        "Ṱ":"T",
        "Ț":"T",
        "Ⱦ":"T",
        "Ṫ":"T",
        "Ṭ":"T",
        "Ƭ":"T",
        "Ṯ":"T",
        "Ʈ":"T",
        "Ŧ":"T",
        "Ɐ":"A",
        "Ꞁ":"L",
        "Ɯ":"M",
        "Ʌ":"V",
        "Ꜩ":"TZ",
        "Ú":"U",
        "Ŭ":"U",
        "Ǔ":"U",
        "Û":"U",
        "Ṷ":"U",
        "Ü":"U",
        "Ǘ":"U",
        "Ǚ":"U",
        "Ǜ":"U",
        "Ǖ":"U",
        "Ṳ":"U",
        "Ụ":"U",
        "Ű":"U",
        "Ȕ":"U",
        "Ù":"U",
        "Ủ":"U",
        "Ư":"U",
        "Ứ":"U",
        "Ự":"U",
        "Ừ":"U",
        "Ử":"U",
        "Ữ":"U",
        "Ȗ":"U",
        "Ū":"U",
        "Ṻ":"U",
        "Ų":"U",
        "Ů":"U",
        "Ũ":"U",
        "Ṹ":"U",
        "Ṵ":"U",
        "Ꝟ":"V",
        "Ṿ":"V",
        "Ʋ":"V",
        "Ṽ":"V",
        "Ꝡ":"VY",
        "Ẃ":"W",
        "Ŵ":"W",
        "Ẅ":"W",
        "Ẇ":"W",
        "Ẉ":"W",
        "Ẁ":"W",
        "Ⱳ":"W",
        "Ẍ":"X",
        "Ẋ":"X",
        "Ý":"Y",
        "Ŷ":"Y",
        "Ÿ":"Y",
        "Ẏ":"Y",
        "Ỵ":"Y",
        "Ỳ":"Y",
        "Ƴ":"Y",
        "Ỷ":"Y",
        "Ỿ":"Y",
        "Ȳ":"Y",
        "Ɏ":"Y",
        "Ỹ":"Y",
        "Ź":"Z",
        "Ž":"Z",
        "Ẑ":"Z",
        "Ⱬ":"Z",
        "Ż":"Z",
        "Ẓ":"Z",
        "Ȥ":"Z",
        "Ẕ":"Z",
        "Ƶ":"Z",
        "Ĳ":"IJ",
        "Œ":"OE",
        "ᴀ":"A",
        "ᴁ":"AE",
        "ʙ":"B",
        "ᴃ":"B",
        "ᴄ":"C",
        "ᴅ":"D",
        "ᴇ":"E",
        "ꜰ":"F",
        "ɢ":"G",
        "ʛ":"G",
        "ʜ":"H",
        "ɪ":"I",
        "ʁ":"R",
        "ᴊ":"J",
        "ᴋ":"K",
        "ʟ":"L",
        "ᴌ":"L",
        "ᴍ":"M",
        "ɴ":"N",
        "ᴏ":"O",
        "ɶ":"OE",
        "ᴐ":"O",
        "ᴕ":"OU",
        "ᴘ":"P",
        "ʀ":"R",
        "ᴎ":"N",
        "ᴙ":"R",
        "ꜱ":"S",
        "ᴛ":"T",
        "ⱻ":"E",
        "ᴚ":"R",
        "ᴜ":"U",
        "ᴠ":"V",
        "ᴡ":"W",
        "ʏ":"Y",
        "ᴢ":"Z",
        "á":"a",
        "ă":"a",
        "ắ":"a",
        "ặ":"a",
        "ằ":"a",
        "ẳ":"a",
        "ẵ":"a",
        "ǎ":"a",
        "â":"a",
        "ấ":"a",
        "ậ":"a",
        "ầ":"a",
        "ẩ":"a",
        "ẫ":"a",
        "ä":"a",
        "ǟ":"a",
        "ȧ":"a",
        "ǡ":"a",
        "ạ":"a",
        "ȁ":"a",
        "à":"a",
        "ả":"a",
        "ȃ":"a",
        "ā":"a",
        "ą":"a",
        "ᶏ":"a",
        "ẚ":"a",
        "å":"a",
        "ǻ":"a",
        "ḁ":"a",
        "ⱥ":"a",
        "ã":"a",
        "ꜳ":"aa",
        "æ":"ae",
        "ǽ":"ae",
        "ǣ":"ae",
        "ꜵ":"ao",
        "ꜷ":"au",
        "ꜹ":"av",
        "ꜻ":"av",
        "ꜽ":"ay",
        "ḃ":"b",
        "ḅ":"b",
        "ɓ":"b",
        "ḇ":"b",
        "ᵬ":"b",
        "ᶀ":"b",
        "ƀ":"b",
        "ƃ":"b",
        "ɵ":"o",
        "ć":"c",
        "č":"c",
        "ç":"c",
        "ḉ":"c",
        "ĉ":"c",
        "ɕ":"c",
        "ċ":"c",
        "ƈ":"c",
        "ȼ":"c",
        "ď":"d",
        "ḑ":"d",
        "ḓ":"d",
        "ȡ":"d",
        "ḋ":"d",
        "ḍ":"d",
        "ɗ":"d",
        "ᶑ":"d",
        "ḏ":"d",
        "ᵭ":"d",
        "ᶁ":"d",
        "đ":"d",
        "ɖ":"d",
        "ƌ":"d",
        "ı":"i",
        "ȷ":"j",
        "ɟ":"j",
        "ʄ":"j",
        "ǳ":"dz",
        "ǆ":"dz",
        "é":"e",
        "ĕ":"e",
        "ě":"e",
        "ȩ":"e",
        "ḝ":"e",
        "ê":"e",
        "ế":"e",
        "ệ":"e",
        "ề":"e",
        "ể":"e",
        "ễ":"e",
        "ḙ":"e",
        "ë":"e",
        "ė":"e",
        "ẹ":"e",
        "ȅ":"e",
        "è":"e",
        "ẻ":"e",
        "ȇ":"e",
        "ē":"e",
        "ḗ":"e",
        "ḕ":"e",
        "ⱸ":"e",
        "ę":"e",
        "ᶒ":"e",
        "ɇ":"e",
        "ẽ":"e",
        "ḛ":"e",
        "ꝫ":"et",
        "ḟ":"f",
        "ƒ":"f",
        "ᵮ":"f",
        "ᶂ":"f",
        "ǵ":"g",
        "ğ":"g",
        "ǧ":"g",
        "ģ":"g",
        "ĝ":"g",
        "ġ":"g",
        "ɠ":"g",
        "ḡ":"g",
        "ᶃ":"g",
        "ǥ":"g",
        "ḫ":"h",
        "ȟ":"h",
        "ḩ":"h",
        "ĥ":"h",
        "ⱨ":"h",
        "ḧ":"h",
        "ḣ":"h",
        "ḥ":"h",
        "ɦ":"h",
        "ẖ":"h",
        "ħ":"h",
        "ƕ":"hv",
        "í":"i",
        "ĭ":"i",
        "ǐ":"i",
        "î":"i",
        "ï":"i",
        "ḯ":"i",
        "ị":"i",
        "ȉ":"i",
        "ì":"i",
        "ỉ":"i",
        "ȋ":"i",
        "ī":"i",
        "į":"i",
        "ᶖ":"i",
        "ɨ":"i",
        "ĩ":"i",
        "ḭ":"i",
        "ꝺ":"d",
        "ꝼ":"f",
        "ᵹ":"g",
        "ꞃ":"r",
        "ꞅ":"s",
        "ꞇ":"t",
        "ꝭ":"is",
        "ǰ":"j",
        "ĵ":"j",
        "ʝ":"j",
        "ɉ":"j",
        "ḱ":"k",
        "ǩ":"k",
        "ķ":"k",
        "ⱪ":"k",
        "ꝃ":"k",
        "ḳ":"k",
        "ƙ":"k",
        "ḵ":"k",
        "ᶄ":"k",
        "ꝁ":"k",
        "ꝅ":"k",
        "ĺ":"l",
        "ƚ":"l",
        "ɬ":"l",
        "ľ":"l",
        "ļ":"l",
        "ḽ":"l",
        "ȴ":"l",
        "ḷ":"l",
        "ḹ":"l",
        "ⱡ":"l",
        "ꝉ":"l",
        "ḻ":"l",
        "ŀ":"l",
        "ɫ":"l",
        "ᶅ":"l",
        "ɭ":"l",
        "ł":"l",
        "ǉ":"lj",
        "ſ":"s",
        "ẜ":"s",
        "ẛ":"s",
        "ẝ":"s",
        "ḿ":"m",
        "ṁ":"m",
        "ṃ":"m",
        "ɱ":"m",
        "ᵯ":"m",
        "ᶆ":"m",
        "ń":"n",
        "ň":"n",
        "ņ":"n",
        "ṋ":"n",
        "ȵ":"n",
        "ṅ":"n",
        "ṇ":"n",
        "ǹ":"n",
        "ɲ":"n",
        "ṉ":"n",
        "ƞ":"n",
        "ᵰ":"n",
        "ᶇ":"n",
        "ɳ":"n",
        "ñ":"n",
        "ǌ":"nj",
        "ó":"o",
        "ŏ":"o",
        "ǒ":"o",
        "ô":"o",
        "ố":"o",
        "ộ":"o",
        "ồ":"o",
        "ổ":"o",
        "ỗ":"o",
        "ö":"o",
        "ȫ":"o",
        "ȯ":"o",
        "ȱ":"o",
        "ọ":"o",
        "ő":"o",
        "ȍ":"o",
        "ò":"o",
        "ỏ":"o",
        "ơ":"o",
        "ớ":"o",
        "ợ":"o",
        "ờ":"o",
        "ở":"o",
        "ỡ":"o",
        "ȏ":"o",
        "ꝋ":"o",
        "ꝍ":"o",
        "ⱺ":"o",
        "ō":"o",
        "ṓ":"o",
        "ṑ":"o",
        "ǫ":"o",
        "ǭ":"o",
        "ø":"o",
        "ǿ":"o",
        "õ":"o",
        "ṍ":"o",
        "ṏ":"o",
        "ȭ":"o",
        "ƣ":"oi",
        "ꝏ":"oo",
        "ɛ":"e",
        "ᶓ":"e",
        "ɔ":"o",
        "ᶗ":"o",
        "ȣ":"ou",
        "ṕ":"p",
        "ṗ":"p",
        "ꝓ":"p",
        "ƥ":"p",
        "ᵱ":"p",
        "ᶈ":"p",
        "ꝕ":"p",
        "ᵽ":"p",
        "ꝑ":"p",
        "ꝙ":"q",
        "ʠ":"q",
        "ɋ":"q",
        "ꝗ":"q",
        "ŕ":"r",
        "ř":"r",
        "ŗ":"r",
        "ṙ":"r",
        "ṛ":"r",
        "ṝ":"r",
        "ȑ":"r",
        "ɾ":"r",
        "ᵳ":"r",
        "ȓ":"r",
        "ṟ":"r",
        "ɼ":"r",
        "ᵲ":"r",
        "ᶉ":"r",
        "ɍ":"r",
        "ɽ":"r",
        "ↄ":"c",
        "ꜿ":"c",
        "ɘ":"e",
        "ɿ":"r",
        "ś":"s",
        "ṥ":"s",
        "š":"s",
        "ṧ":"s",
        "ş":"s",
        "ŝ":"s",
        "ș":"s",
        "ṡ":"s",
        "ṣ":"s",
        "ṩ":"s",
        "ʂ":"s",
        "ᵴ":"s",
        "ᶊ":"s",
        "ȿ":"s",
        "ɡ":"g",
        "ᴑ":"o",
        "ᴓ":"o",
        "ᴝ":"u",
        "ť":"t",
        "ţ":"t",
        "ṱ":"t",
        "ț":"t",
        "ȶ":"t",
        "ẗ":"t",
        "ⱦ":"t",
        "ṫ":"t",
        "ṭ":"t",
        "ƭ":"t",
        "ṯ":"t",
        "ᵵ":"t",
        "ƫ":"t",
        "ʈ":"t",
        "ŧ":"t",
        "ᵺ":"th",
        "ɐ":"a",
        "ᴂ":"ae",
        "ǝ":"e",
        "ᵷ":"g",
        "ɥ":"h",
        "ʮ":"h",
        "ʯ":"h",
        "ᴉ":"i",
        "ʞ":"k",
        "ꞁ":"l",
        "ɯ":"m",
        "ɰ":"m",
        "ᴔ":"oe",
        "ɹ":"r",
        "ɻ":"r",
        "ɺ":"r",
        "ⱹ":"r",
        "ʇ":"t",
        "ʌ":"v",
        "ʍ":"w",
        "ʎ":"y",
        "ꜩ":"tz",
        "ú":"u",
        "ŭ":"u",
        "ǔ":"u",
        "û":"u",
        "ṷ":"u",
        "ü":"u",
        "ǘ":"u",
        "ǚ":"u",
        "ǜ":"u",
        "ǖ":"u",
        "ṳ":"u",
        "ụ":"u",
        "ű":"u",
        "ȕ":"u",
        "ù":"u",
        "ủ":"u",
        "ư":"u",
        "ứ":"u",
        "ự":"u",
        "ừ":"u",
        "ử":"u",
        "ữ":"u",
        "ȗ":"u",
        "ū":"u",
        "ṻ":"u",
        "ų":"u",
        "ᶙ":"u",
        "ů":"u",
        "ũ":"u",
        "ṹ":"u",
        "ṵ":"u",
        "ᵫ":"ue",
        "ꝸ":"um",
        "ⱴ":"v",
        "ꝟ":"v",
        "ṿ":"v",
        "ʋ":"v",
        "ᶌ":"v",
        "ⱱ":"v",
        "ṽ":"v",
        "ꝡ":"vy",
        "ẃ":"w",
        "ŵ":"w",
        "ẅ":"w",
        "ẇ":"w",
        "ẉ":"w",
        "ẁ":"w",
        "ⱳ":"w",
        "ẘ":"w",
        "ẍ":"x",
        "ẋ":"x",
        "ᶍ":"x",
        "ý":"y",
        "ŷ":"y",
        "ÿ":"y",
        "ẏ":"y",
        "ỵ":"y",
        "ỳ":"y",
        "ƴ":"y",
        "ỷ":"y",
        "ỿ":"y",
        "ȳ":"y",
        "ẙ":"y",
        "ɏ":"y",
        "ỹ":"y",
        "ź":"z",
        "ž":"z",
        "ẑ":"z",
        "ʑ":"z",
        "ⱬ":"z",
        "ż":"z",
        "ẓ":"z",
        "ȥ":"z",
        "ẕ":"z",
        "ᵶ":"z",
        "ᶎ":"z",
        "ʐ":"z",
        "ƶ":"z",
        "ɀ":"z",
        "ﬀ":"ff",
        "ﬃ":"ffi",
        "ﬄ":"ffl",
        "ﬁ":"fi",
        "ﬂ":"fl",
        "ĳ":"ij",
        "œ":"oe",
        "ﬆ":"st",
        "ₐ":"a",
        "ₑ":"e",
        "ᵢ":"i",
        "ⱼ":"j",
        "ₒ":"o",
        "ᵣ":"r",
        "ᵤ":"u",
        "ᵥ":"v",
        "ₓ":"x"
    }
}

String.prototype.latinise=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return Latinise.latin_map[a]||a})};
String.prototype.latinize=String.prototype.latinise;
String.prototype.isLatin=function(){return this==this.latinise()}

const get_img_src = (set, name) => {
    const folder = core_sets.includes(set) ? `core_sets` : 'extensions'
    const cleaned_name = name.latinise().replace(/[',’]/g, '').replace(/ /g, '_').toLowerCase()

    return `./img/moonga/${folder}/${set.replace(/ /g, '_').toLowerCase()}/${cleaned_name}.jpg`
}

const get_set = set => {
    const cards = core_sets.includes(set) 
        ? data.filter(d => d.core_set === set)
        : data.filter(d => d.extension === set)
    
    return cards
}

const get_sog_card = moongaId => {
    return sog_data.find(s => parseInt(s.moongaId, 10) === moongaId && s.contracts && s.contracts.counterparty.id !== '')
}

const render_set = (set, cards = [], render_set_name = true) => {
    let html = ''
    
    if(render_set_name) {
        html += `<div class="alert alert-dark text-center mb-5">
            <h2 class="mb-0">${set}</h2>
        </div>`
    }

    html += '<div class="row">'

    cards.forEach(card => {
        const {
            name,
            core_set,
            extension,
            rarity,
            design_link,
            design_date,
            artist,
            card_id
        } = card

        let sog_card = get_sog_card(card_id)

        html += `<div class="col-12 col-sm-6 col-md-4 col-xl-3 card-col ${sog_card ? 'has-sog-card': ''}">
            <div class="card mb-5">
                <img src="${get_img_src(set, name)}" class="card-img-top" alt="${name}">

                
                <div class="card-body text-center">
                    <h5 class="card-title">${name}</h5>
                    
                    <div class="mb-2">${rarity ? `(${rarity})` : ''}</div>
                    <div class="mb-2">${artist ? `Artist: ${artist}` : ''}</div>

                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#moongaModal" data-card-id="${card_id}">INFO</button>

                        ${sog_card ? `<a href="https://xchain.io/asset/${sog_card.contracts.counterparty.id}" target="_blank" class="btn btn-light">View SoG card on Xchain</a>` : ''}
                    </div>
                </div>
            </div>
        </div>`
    })

    html += '</div>'

    document.querySelector('#result').innerHTML += html
}

const render_all_sets = () => {
    [...core_sets, ...extensions].forEach(set => {
        const cards = get_set(set)
        render_set(set, cards)        
    })
}

const get_rarity_color = rarity => {
    switch(rarity) {
        case 'Common':
            return 'silver'
        case 'Uncommon':
            return 'red'
        case 'Rare':
            return 'green'
        case 'Mythical':
            return 'gold'
    }
}

const render_description = description => {
    let html = '<div class="description">'
    
    html += description
    
    html = html.replace(/[ ]?(\d)pp[ ]?/g, `<span class="icon_text" title="$1 power point(s)"><img class="icon" src="./icons/pp.png" /><span class="text">$1</span></span>`)
    html = html.replace(/[ ]?(\d)pv[ ]?/g, `<span class="icon_text" title="$1 health point(s)"><img class="icon" src="./icons/pv.png" /><span class="text">$1</span></span>`)
    
    html = html.replace(/:earth:/g, `<span class="icon_text" title="Earth element"><img class="icon" src="./icons/earth.png" /></span>`)
    html = html.replace(/:fire:/g, `<span class="icon_text" title="Fire element"><img class="icon" src="./icons/fire.png" /></span>`)
    html = html.replace(/:ice:/g, `<span class="icon_text" title="Ice element"><img class="icon" src="./icons/ice.png" /></span>`)
    html = html.replace(/:light:/g, `<span class="icon_text" title="Light element"><img class="icon" src="./icons/light.png" /></span>`)
    html = html.replace(/:water:/g, `<span class="icon_text" title="Water element"><img class="icon" src="./icons/water.png" /></span>`)

    html = html.replace(/:ly.ee:/g, `<span class="icon_text" title="Ether-Earth affinity"><img class="icon" src="./icons/ether-earth.png" /></span>`)
    html = html.replace(/:ly.ef:/g, `<span class="icon_text" title="Ether-Fire affinity"><img class="icon" src="./icons/ether-fire.png" /></span>`)
    html = html.replace(/:ly.ei:/g, `<span class="icon_text" title="Ether-Ice affinity"><img class="icon" src="./icons/ether-ice.png" /></span>`)
    html = html.replace(/:ly.ew:/g, `<span class="icon_text" title="Ether-Water affinity"><img class="icon" src="./icons/ether-water.png" /></span>`)

    html = html.replace(/[ ]?patk(.\d+)?[ ]?/g, `<span class="icon_text" title="$1 attack point(s)"><img class="icon" src="./icons/atk.png" /><span class="text">$1</span></span>`)
    html = html.replace(/[ ]?pdef(.\d+)?[ ]?/g, `<span class="icon_text" title="$1 defense point(s)"><img class="icon" src="./icons/def.png" /><span class="text">$1</span></span>`)
    html = html.replace(/[ ]?pdd(.\d+)?[ ]?/g, `<span class="icon_text" title="$1 damage point(s)"><img class="icon" src="./icons/dmg.png" /><span class="text">$1</span></span>`)

    html = html.replace(/[ ]?patk[ ]?/g, `<span class="icon_text" title="attack point(s)"><img class="icon" src="./icons/atk.png" /></span>`)
    html = html.replace(/[ ]?pdef[ ]?/g, `<span class="icon_text" title="defense point(s)"><img class="icon" src="./icons/def.png" /></span>`)
    html = html.replace(/[ ]?pdd[ ]?/g, `<span class="icon_text" title="damage point(s)"><img class="icon" src="./icons/dmg.png" /></span>`)
    html = html.replace(/[ ]pv[ ]?/g, `<span class="icon_text" title="health point(s)"><img class="icon" src="./icons/pv.png" /></span>`)
    html = html.replace(/[ ]pp[ ]?/g, `<span class="icon_text" title="power point(s)"><img class="icon" src="./icons/pp.png" /></span>`)

    html = html.replace(/\n/g, '<br />')

    html += '</div>'

    return html
}

const setup_modal = () => {
    try {
        const moongaModal = document.getElementById('moongaModal')
        if (moongaModal) {
            moongaModal.addEventListener('show.bs.modal', event => {
                const button = event.relatedTarget

                const card_id = parseInt(button.getAttribute('data-card-id'), 10)

                const card = data.find(d => d.card_id === card_id)

                if(card) {
                    const {
                        artist,
                        card_id,
                        core_set,
                        description,
                        design_date,
                        design_link,
                        extension,
                        name,
                        rarity,
                        slug,
                        title,
                    } = card

                    const sog_card = get_sog_card(card_id)

                    const modalTitle = moongaModal.querySelector('.modal-title')
                    const modalBody = moongaModal.querySelector('.modal-body')

                    let html = '<div class="row">'
                    html += '<div class="col-12 col-md-4 mb-4 mb-md-0">'

                    if(sog_card) {
                        html += `<h4>Moonga card</h4>`
                    }

                    html += `<img src="${get_img_src(core_set ? core_set : extension, name)}" style="width: 100%" />`

                    if(design_link) {
                        html += '<div class="d-grid gap-2 pt-3">'
                        html += `<a href="${design_link}" target="_blank" class="btn btn-primary">View design on DeviantArt</a>`
                        html += '</div>'
                    }

                    html += '</div>'

                    if(sog_card) {
                        html += '<div class="col-12 col-md-4 mb-4 mb-md-0">'
                    } else {
                        html += '<div class="col-12 col-md-8">'
                    }

                    if(sog_card) {
                        html += `<h4>&nbsp;</h4>`
                    }

                    html += `<table class="table table-striped"><tbody>`

                    html += `<tr><td>Set</td><td>${core_set ? core_set : extension}</td></tr>`
                    html += `<tr><td>Card Id</td><td>${card_id}</td></tr>`
                    html += `<tr><td>Name</td><td>${name}</td></tr>`
                    html += `<tr><td>Artist</td><td>${artist}</td></tr>`
                    html += `<tr><td>Title</td><td>${title ? title : 'n/a'}</td></tr>`
                    html += `<tr><td>Description</td><td>${description ? render_description(description) : 'n/a'}</td></tr>`
                    html += `<tr><td>Rarity</td><td>${rarity} (${get_rarity_color(rarity)}, see logo top right)</td></tr>`
                    
                    if(sog_card) {
                        html += `<tr><td>SoG Rarity</td><td>${sog_card.rarity}</td></tr>`
                    }

                    html += '</tbody></table>'

                    html += '</div>'

                    if(sog_card) {
                        html += '<div class="col-12 col-md-4">'
                        html += `<h4>Spells of Genesis card</h4>`

                        html += `<img src="./img/spells_of_genesis/${sog_card.contracts.counterparty.id}.jpg" style="width: 100%" />`

                        html += '<div class="d-grid gap-2 pt-3">'
                        html += `<a href="https://spellsofgenesis.com/cards/${sog_card.unid}" target="_blank" class="btn btn-primary">View on SoG.com</a>`
                        html += `<a href="https://xchain.io/asset/${sog_card.contracts.counterparty.id}" target="_blank" class="btn btn-primary">View on Xchain</a>`
                        html += '</div>'
                        html += '</div>'
                    }

                    html += '</div>'
                    modalTitle.textContent = `${name}`
                    modalBody.innerHTML = html
                }
            })
        }                
    } catch(e) {
        console.log(e)
    }
}

const emptyResult = () => {
    document.querySelector('#result').innerHTML = ''
}

const addEventListeners = () => {
    const form = document.querySelector('form')
    const select = document.querySelector('#set')
    const sog_cards_checkbox = document.querySelector('#sog_cards_only')
    
    select.addEventListener('change', e => {
        e.preventDefault()
        emptyResult()
        artist_select.value = ''
        sog_cards_checkbox.checked = false

        const set = e.target.value

        if(set !== '') {
            const cards = get_set(set)
            render_set(set, cards)        
        } else {
            render_all_sets()
        }
    })

    sog_cards_checkbox.addEventListener('change', e => {
        if(e.target.checked) {
            document.querySelectorAll('.card-col').forEach(col => {
                if(!col.classList.contains('has-sog-card')) {
                    col.classList.add('d-none')
                }
            })
        } else {
            document.querySelectorAll('.card-col').forEach(col => {
                col.classList.remove('d-none')
            })
        }
    })

    artist_select.addEventListener('change', e => {
        e.preventDefault()
        emptyResult()
        select.value = ''
        sog_cards_checkbox.checked = false

        const artist = e.target.value

        if(artist !== '') {
            const all_sets = core_sets.concat(extensions)

            all_sets.forEach(set => {
                const cards = get_set(set).filter(c => c.artist === artist)
                render_set(set, cards)        
            })
        } else {
            render_all_sets()
        }
    })
}

const init = async () => {
    const json = await get_data()

    core_sets = _.uniqBy(json, 'core_set').map(i => i.core_set).filter(i => i !== '')
    extensions = _.uniqBy(json, 'extension').map(i => i.extension).filter(i => i !== '')

    addEventListeners()
    setup_modal()

    render_all_sets()
}

init()