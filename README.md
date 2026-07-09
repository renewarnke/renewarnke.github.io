# renewarnke.de

Persönliche Landingpage für IT-Beratung — gebaut mit [Jekyll](https://jekyllrb.com/).
Modernes, data-driven Setup ohne Bootstrap/jQuery: die Inhalte liegen in `_data/`
und `_config.yml`, das Markup in schlanken Partials unter `_includes/`, das Styling
als Sass in `assets/css/main.scss`. Icons sind inline (SVG), Schriften sind der
System-Font-Stack — keine externen Requests (DSGVO-freundlich).

## Struktur

```
_config.yml            Seiten-Einstellungen, Hero-Text, Social, Adresse
_data/
  navigation.yml       Menüpunkte
  services.yml         Leistungen (Karten)
  solutions.yml        Lösungen/Tools (Chips)
_layouts/default.html  Seitengerüst
_includes/*.html       Sektionen (hero, services, solutions, about, contact, footer …)
assets/css/main.scss   Styling (Sass -> compiled)
assets/js/main.js      Navigation, Scroll, Kontaktformular (Fetch)
index.html             Einstiegsseite
```

## Inhalte pflegen

- **Text / Kontakt / Social:** `_config.yml`
- **Leistungen:** `_data/services.yml` (`icon` = `infrastruktur` | `workplace` | `strategie`)
- **Lösungen:** `_data/solutions.yml`
- **Menü:** `_data/navigation.yml`

Das Kontaktformular läuft über Nextcloud Forms auf `nc.warnke.cloud` — die
Embed-URL steht als `nextcloud_forms_embed_url` in `_config.yml`.

## Lokal bauen

```bash
bundle install
bundle exec jekyll serve
```

Der Push auf `main` wird über GitHub Actions gebaut und auf GitHub Pages
veröffentlicht (siehe `.github/workflows/jekyll.yml`).
