var mainGrammar = {
    "origin": [
"Il est #accroche#, #lieu# qui les #verbe# est #complément# par #détail#, dont #caractéristique# est #comparateur# #nombre# lieues, suivant #géographe#. \\#GeoVerneBot"],
    "accroche": ["admis", "assuré", "attesté", "avéré", "certain", "démontré", "établi", "évident", "incontestable", "indéniable", "indiscutable", "indubitable", "irrécusable", "irréfragable", "irréfutable", "manifeste", "notoire", "reconnu", "sûr"],
    "lieu": ["l'arche", "l'exsurgence", "la baie", "la barkhane", "la barre", "la butte", "la caldeira", "la calanque", "la chute d'eau", "la colline", "la combe", "la côte", "la crevasse", "la cuesta", "la doline", "la dune", "la falaise", "la forêt ", "la gorge", "la garrigue", "la lagune", "la mesa", "la moraine", "la péninsule", "la plage", "la plaine", "la reculée", "la ria", "la rivière", "la rizière", "la sebkha", "la source", "la steppe", "la terrasse", "la tourbière", "la tufière", "la vallée"],
    "verbe": ["jouxte", "borde", "encadre", "entoure", "prolonge", "limite", "longe", "flanque"],
    "complément": ["circonscrite", "entourée", "enserrée", "encadrée", "ourlée", "enfermée", "ceinturée", "bordée", "enveloppée", "enclavée", "surplombée", "dominée", "surmontée"],
    "détail": ["une ceinture de récifs coralligènes", "une anse semi-circulaire", "des montagnes couvertes de verdure", "des étangs peuplés d’alligators verdâtres", "des îlots montagneux très escarpés", "un cordon de récifs et d'îlots désolés", "un port abrité des mauvais vents", "des montagnes","d’immenses savanes, propres à la culture","des forêts de cocotiers et de palmiers aux troncs tapissés d’orchidées parasites","de sombres fourrés","de larges forêts de mapés qui descendent jusqu’au rivage","des cimes émergées plutôt arides que verdoyantes"],
    "caractéristique": ["la circonférence", "la longueur", "la dimension", "la taille", "la largeur", "la profondeur", "l'extension", "l'envergure", "l'étendue", "l'importance", "l'élévation"],
    "comparateur": ["inférieure à", "supérieure à", "presque égale à", "quasiment égale à", "sinificativement inférieure à"],
    "nombre": ["cent dix", "cinquante-quatre", "deux cents", "quatre-vingt-neuf", "six cent cinquante", "soixante et une", "soixante-huit", "trente-huit", "trente-six", "vingt-six"],
    "géographe": ["Alexander von Humboldt", "Carl Ritter", "Élisée Reclus ", "Friedrich Ratzel", "Paul Vidal de la Blache", "Victor Adolphe Malte-Brun", "William Morris Davis", "Mungo Park"]
};

module.exports = mainGrammar;
