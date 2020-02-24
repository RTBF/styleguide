# Guide d'utilisation des différents éléments digitaux des portails de la RTBF

## RTBF [S]CSS Codebase
**[RTBF CSS Styleguide is still online.](https://github.com/RTBF/styleguide/tree/styleguide-2015)** 

## Environnement technique

- Cette plateforme utilise **[VuePress](https://vuepress.vuejs.org/)**

## Comment l'utiliser

1. Cloner localement le repository
2. Suivre la [procédure d'installation de VuePress](https://vuepress.vuejs.org/guide/getting-started.html)
3. Apporter les adaptations prévues
4. Mettre à jour le repository (git push)
5. Déployer sur l'hébergement le contenu du répertoire `.vuepress/dist`

## Lancer le serveur local (dev)

Sur le répertoire dans lequel vous avez cloné le repo au niveau de /guidelines lancer la commande suivante

```
vuepress dev
```

L'application est dès lors accessible localement sur l'adresse http://localhost:8080/

## Exporter (build)

Sur le même répertoire lancer la commande

```
vuepress build
```

Cela va générer ou mettre à jour le contenu du répertoire `.vuepress/dist` qui est l'application statique à déployer sur l'hébergement.

## Configuration de l'URL de déploiement

Base documentaire sur le routing : https://vuepress.vuejs.org/config/#basic-config
