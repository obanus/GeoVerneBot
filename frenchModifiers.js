var frenchModifiers = {

    s: function (s) {
        switch (s.charAt(s.length - 1) || s.charAt(s.length - 2) || s.charAt(s.length - 3)) {
            case 'eu':
            case 'au':
                if (['landau', 'sarau', 'pneu', 'bleu', 'émeu', 'enfeu'].indexOf(s) >= 0)
                    return s + "s";
                else
                    return s + "x";
                break;
            case 'ou':
                if (['bijou', 'caillou', 'chou', 'genou', 'hibou', 'joujou', 'pou'].indexOf(s) >= 0)
                    return s + "x";
                else
                    return s + "s";
                break;
            case 's':
            case 'x':
            case 'z':
                return s;
            case 'al':
                if (['bal', 'carnaval', 'chacal', 'festival', 'récital', 'régal', 'cal', 'serval'].indexOf(s) >= 0)
                    return s + "s";
                else
                    return s.charAt(s.length - 2) + "aux";
                break;
            case 'ail':
                if (['bail', 'corail', 'émail', 'soupirail', 'travail', 'vantail', 'vitrail'].indexOf(s) >= 0)
                    return s.charAt(s.length - 3) + "aux";
                else
                    return s + "s";
                break;
            default:
                return s + "s";
        }
    }

};

module.exports = frenchModifiers;
