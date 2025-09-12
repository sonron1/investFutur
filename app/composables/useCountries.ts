
interface Country {
    code: string;
    name: string;
    flag?: string;
}

export const useCountries = () => {
    const countries: Country[] = [
        // Europe
        { code: 'FR', name: 'France' },
        { code: 'BE', name: 'Belgique' },
        { code: 'CH', name: 'Suisse' },
        { code: 'IT', name: 'Italie' },
        { code: 'ES', name: 'Espagne' },
        { code: 'DE', name: 'Allemagne' },
        { code: 'PT', name: 'Portugal' },
        { code: 'NL', name: 'Pays-Bas' },
        { code: 'AT', name: 'Autriche' },
        { code: 'LU', name: 'Luxembourg' },
        { code: 'IE', name: 'Irlande' },
        { code: 'GB', name: 'Royaume-Uni' },
        { code: 'SE', name: 'Suède' },
        { code: 'NO', name: 'Norvège' },
        { code: 'DK', name: 'Danemark' },
        { code: 'FI', name: 'Finlande' },
        { code: 'IS', name: 'Islande' },
        { code: 'PL', name: 'Pologne' },
        { code: 'CZ', name: 'République tchèque' },
        { code: 'SK', name: 'Slovaquie' },
        { code: 'HU', name: 'Hongrie' },
        { code: 'RO', name: 'Roumanie' },
        { code: 'BG', name: 'Bulgarie' },
        { code: 'HR', name: 'Croatie' },
        { code: 'SI', name: 'Slovénie' },
        { code: 'EE', name: 'Estonie' },
        { code: 'LV', name: 'Lettonie' },
        { code: 'LT', name: 'Lituanie' },
        { code: 'MT', name: 'Malte' },
        { code: 'CY', name: 'Chypre' },
        { code: 'GR', name: 'Grèce' },

        // Amérique du Nord
        { code: 'US', name: 'États-Unis' },
        { code: 'CA', name: 'Canada' },
        { code: 'MX', name: 'Mexique' },

        // Amérique du Sud
        { code: 'BR', name: 'Brésil' },
        { code: 'AR', name: 'Argentine' },
        { code: 'CL', name: 'Chili' },
        { code: 'CO', name: 'Colombie' },
        { code: 'PE', name: 'Pérou' },
        { code: 'VE', name: 'Venezuela' },
        { code: 'UY', name: 'Uruguay' },
        { code: 'PY', name: 'Paraguay' },
        { code: 'BO', name: 'Bolivie' },
        { code: 'EC', name: 'Équateur' },
        { code: 'GY', name: 'Guyane' },
        { code: 'SR', name: 'Suriname' },

        // Asie
        { code: 'JP', name: 'Japon' },
        { code: 'CN', name: 'Chine' },
        { code: 'IN', name: 'Inde' },
        { code: 'KR', name: 'Corée du Sud' },
        { code: 'TH', name: 'Thaïlande' },
        { code: 'VN', name: 'Vietnam' },
        { code: 'SG', name: 'Singapour' },
        { code: 'MY', name: 'Malaisie' },
        { code: 'ID', name: 'Indonésie' },
        { code: 'PH', name: 'Philippines' },
        { code: 'TW', name: 'Taïwan' },
        { code: 'HK', name: 'Hong Kong' },
        { code: 'MO', name: 'Macao' },

        // Moyen-Orient
        { code: 'AE', name: 'Émirats arabes unis' },
        { code: 'SA', name: 'Arabie saoudite' },
        { code: 'QA', name: 'Qatar' },
        { code: 'KW', name: 'Koweït' },
        { code: 'BH', name: 'Bahreïn' },
        { code: 'OM', name: 'Oman' },
        { code: 'IL', name: 'Israël' },
        { code: 'TR', name: 'Turquie' },
        { code: 'IR', name: 'Iran' },
        { code: 'IQ', name: 'Irak' },
        { code: 'SY', name: 'Syrie' },
        { code: 'LB', name: 'Liban' },
        { code: 'JO', name: 'Jordanie' },

        // Afrique
        { code: 'MA', name: 'Maroc' },
        { code: 'DZ', name: 'Algérie' },
        { code: 'TN', name: 'Tunisie' },
        { code: 'EG', name: 'Égypte' },
        { code: 'ZA', name: 'Afrique du Sud' },
        { code: 'NG', name: 'Nigeria' },
        { code: 'KE', name: 'Kenya' },
        { code: 'GH', name: 'Ghana' },
        { code: 'ET', name: 'Éthiopie' },
        { code: 'UG', name: 'Ouganda' },
        { code: 'TZ', name: 'Tanzanie' },
        { code: 'ZW', name: 'Zimbabwe' },
        { code: 'BW', name: 'Botswana' },
        { code: 'NA', name: 'Namibie' },
        { code: 'ZM', name: 'Zambie' },

        // Océanie
        { code: 'AU', name: 'Australie' },
        { code: 'NZ', name: 'Nouvelle-Zélande' },
        { code: 'FJ', name: 'Fidji' },
        { code: 'PG', name: 'Papouasie-Nouvelle-Guinée' },

        // Territoires français d'outre-mer
        { code: 'GF', name: 'Guyane française' },
        { code: 'GP', name: 'Guadeloupe' },
        { code: 'MQ', name: 'Martinique' },
        { code: 'RE', name: 'La Réunion' },
        { code: 'YT', name: 'Mayotte' },
        { code: 'NC', name: 'Nouvelle-Calédonie' },
        { code: 'PF', name: 'Polynésie française' },
        { code: 'BL', name: 'Saint-Barthélemy' },
        { code: 'MF', name: 'Saint-Martin' },
        { code: 'PM', name: 'Saint-Pierre-et-Miquelon' },
        { code: 'WF', name: 'Wallis-et-Futuna' }
    ];

    // Trier les pays par ordre alphabétique (sauf la France en premier)
    const sortedCountries = computed(() => {
        const france = countries.find(c => c.code === 'FR');
        const otherCountries = countries
            .filter(c => c.code !== 'FR')
            .sort((a, b) => a.name.localeCompare(b.name, 'fr'));

        return france ? [france, ...otherCountries] : otherCountries;
    });

    // Pays européens uniquement
    const europeanCountries = computed(() => {
        const europeanCodes = [
            'FR', 'BE', 'CH', 'IT', 'ES', 'DE', 'PT', 'NL', 'AT', 'LU',
            'IE', 'GB', 'SE', 'NO', 'DK', 'FI', 'IS', 'PL', 'CZ', 'SK',
            'HU', 'RO', 'BG', 'HR', 'SI', 'EE', 'LV', 'LT', 'MT', 'CY', 'GR'
        ];

        return countries.filter(c => europeanCodes.includes(c.code));
    });

    // Pays les plus couramment utilisés pour un investisseur français
    const popularCountries = computed(() => {
        const popularCodes = ['FR', 'BE', 'CH', 'LU', 'US', 'CA', 'GB', 'DE', 'ES', 'IT'];
        const popular = countries.filter(c => popularCodes.includes(c.code));
        const others = countries.filter(c => !popularCodes.includes(c.code))
            .sort((a, b) => a.name.localeCompare(b.name, 'fr'));

        return [...popular, ...others];
    });

    // Obtenir un pays par son code
    const getCountryByCode = (code: string): Country | undefined => {
        return countries.find(c => c.code === code);
    };

    // Obtenir le nom d'un pays par son code
    const getCountryName = (code: string): string => {
        const country = getCountryByCode(code);
        return country?.name || code;
    };

    // Rechercher des pays
    const searchCountries = (query: string): Country[] => {
        if (!query) return sortedCountries.value;

        const searchTerm = query.toLowerCase();
        return countries.filter(country =>
            country.name.toLowerCase().includes(searchTerm) ||
            country.code.toLowerCase().includes(searchTerm)
        );
    };

    return {
        countries: sortedCountries,
        europeanCountries,
        popularCountries,
        getCountryByCode,
        getCountryName,
        searchCountries
    };
};