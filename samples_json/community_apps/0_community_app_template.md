# Documentation for 0_community_app_template.json
> aka Community Apps detailed

## modes

defines the iWidget "modes" supported by this widget.

For cloud: [view|fullscreen|edit]

*view* means shown in the community overview page
*fullscreen* means a new item entry gets added to community navigation menu
*edit* means an "edit" mode panel is shown to community owners when in "edit community mode

Officially only view and fullscreen are availabe but the widget XML shows IBM also has the placeholder for edit mode. Edit mode is show in the page or in the edit community screen

## defid

In connections On-Prem this is ...

It's equivalente to the XML widgetdef proprerty. This string is used as the key to identify the widget type in the communit atom document. Suggested to be a mnemonic keyword

> BEWARE: this value is the key in communities database.. If you change it after it has been used.. you break things

> Note: as in cloud no translation/labels are supported you cannot use....

## primaryWidget

Not documented for cloud, but working. Specifies that the widget displays in the center column of the page. The default value is true.

## uniqueInstance

Not documented for cloud, but working. Default is true. If false then the widget can be added to the community more than once.

## resourceOwnerWidget
 
False is default. If True only users with the community owner role can see/use the widget.

## showInPalette

Not documented for cloud, but working. Default is true. If false then the widget is not shown in the widget catalog. Can be added to the community atom document using APIs.

## navBarLink

Not documented for cloud, but working. If this has a value then a new item is shown in the community navigation menu with a link to the URL passed here. Goot to open a "full-app" externally

## themes

Working as documented.

## helpLink

Not documented for cloud, but working. If this has a value then the widget context menu shows an "help" item. When selected a new window is opened with this url as parameter.

## itemSet

## url

As documented, the URL for the iFrame, can containe substitution variables.

## Example javascript

```javascript
{
    "modes": "view|fullscreen|edit", 
    "defId": "Space Invaders", 
    "primaryWidget": "true", 
    "uniqueInstance": "false", 
    "resourceOwnerWidget": "false",
    "showInPalette": "true", 
    "navBarLink": "https://www.ibm.com", 
    "themes": "wpthemeThin wpthemeNarrow wpthemeWide wpthemeBanner", 
    "helpLink": "http://www.ibm.com/it-it/?lang={lang}&communityUUID={resourceId}&version={version}&modified={lastMod}", 
    "itemSet": [
        {
            "value": "https://dl.dropboxusercontent.com/u/658119/ibm-connections-cloud-community-app/HTML5-Space-Invaders/HTML5-Space-Invaders.html?lang={lang}", 
            "name": "url"
        },
        {
            "value": "700px",
            "name": "height"
        },
        {
            "value": "100%",
            "name": "width"
        }
    ],
    "url": "https://apps.collabservnext.com/connections/resources/web/com.ibm.social.urliWidget.web.resources/widget/urlWidget.xml" 
}
```