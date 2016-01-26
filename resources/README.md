
| <h1>najax.js &lt;any-ajax&gt;</h1> | ![any series](./includes/any.png) |
|:---|---:|

## Features

- <b>najax.js</b>. You can use ajax easily and customize request & response behaviors.

- Supported [response-type](#response-type) is raw text / json / jsonp / html / script / csv / or others...
  And it has many ajax options, async / sync / retry / timeout / cache / oth others by [Nx](Nx.html) object.

- Cross-domain requests supported by $najax.scriptTag / $najax.jsonpTag.

- There are various helper methods, <i>$najax.url</i>, <i>$najax.query</i>, <i>$najax.submit</i>.
  And [helper classes]($najax@helper.html), <i>Singular</i>, <i>Pager</i>, <i>Reflector</i> classes support 'ajax + ui'. 

- [$najax.history]($najax.history.html) can easily operate url-history(push / replace / listen).

- [Relay](Relay.html) / [Linker](Linker.html) class. It can bundle responses.

## Requirements
- <b>None.</b>  <u>Any other library is unnecessary.</u>
   <small>(Only $najax.sendex method requires <i>any.js</i> and <i>jQuery</i> library.)</small>

## Browser Support
- Modern web-browsers(Chrome, IE, Firefox, Safari, Opera) support.
- IE browser: Support IE9.  Loose support in IE8. (You can use most of the functions.)
- Legacy browser partially support.

## Basic usage(code example)
```
// Ajax by $najax.request
$najax.request(url).done();
//
// Set request and response behaviors by Nx
$najax.request(url).type('text').timeout(5).retry(3).done();
$najax.csv(url).done();
$najax.sync(url).param('stone', 'age').done();
//
// It's possible to set success / fail / complete function
$najax.request(url).success(sccs).complete(cmp).done();
$najax.request(url).fail(fail).complete(cmp).done();
$najax.request(url).done(sccs);
//
//
// Others
// See tutorials.
```    

## Tutorials / Demos / Reference

There are many tutorials.

| Reference | Tutorial | Description | Default ver | Tiny ver | RLK ver |
|:---|:---|:---|
| [$najax]($najax.html) | [static-najax.html](tutorial-static-najax.html) | $najax various methods tutorials. | Yes | Part | - |
| [$najax@ex]($najax@ex.html) | [najax-ex.html](tutorial-najax-ex.html) | $najax.send / $najax.sendex tutorials. | Yes | - | - |
| [$najax@helper]($najax@helper.html) | [najax-helper.html](tutorial-najax-helper.html) | $najax helper methods. | Yes | Yes | - |
| [$najax@read]($najax@read.html) | [najax-read.html](tutorial-najax-read.html) | $najax.require / $najax.load / $najax.module tutorials. | Yes | Yes | - |
| [$najax@class]($najax@class.html) | [najax-class.html](tutorial-najax-class.html) | Singular / Pager / Reflector class tutorials. | Yes | - | - |
| [$najax.history]($najax.history.html) | [static-history.html](tutorial-static-history.html) | $najax.history tutorials. | Yes | - | - |
| [Relay](Relay.html) / [Linker](Linker.html) | [relaylinker.html](tutorial-relaylinker.html)<br>[rlk-standalone.html](tutorial-rlk-standalone.html) | Relay and <i>Linker</i> class tutorials. | Yes | Yes | Yes |
| --- | [demo-ui-ajax.html](tutorial-demo-ui-ajax.html) | Ajax and UI demo. Used various methods. | - | - | - |


## Distributions

For detail, see reference.

| Distribution | Introduction |
|:---|:---|
| najax.js / najax.min.js | Default version. |
| najax-tiny.js / najax-tiny.min.js | Tiny version. Not include the below.<br><br>$najax.history<br>$najax.send / $najax.sendex<br>$najax.scriptTag / $najax.jsonpTag<br>$najax@class(Singular, Pager, Reflector) |
| rlk.js / rlk.min.js | Relay / Linker standalone version. |


<a id="response-type"></a>

## Ajax response type
See [Nx.type](Nx.html#type__anchor) for detail.

| Type | Description | Value type |
|:---|:---|:---|
| <code>json(*)</code> | Json. | assoc |
| <code>raw</code> | Raw data. | string |
| <code>text</code> | Text. <i>text</i> is same as <i>raw</i>. | string |
| <code>html</code> | HTML. | Element |
| <code>script</code> | Execute script. | null |
| <code>func</code> | Function. | function |
| <code>jsonp</code> | Jsonp. | null |
| <code>csv</code> | Csv(Tsv). | array |
| <code>xml</code> | Xml. | XMLDocument |
| <code>blob</code> | Blob. | Blob |
| <code><i>other</i></code> | XMLHttpRequest.responseType. | Varies. |

 
## Nx class specification
Nx class. This class is created automatically by $najax various method.

 <b>Specification</b><br>
 - Specify ajax request and response behaviors by <code>Nx object</code>.
 - Specify by Nx object's various method or <code>Nx <i>opt</i></code> method.
 - Begin ajax connection by <code>Nx <i>done</i></code>.
 - <code>Nx <i>done</i></code> returns <code>Relay object</code>.
 - <code>Relay</code> provide operating response-data, and bundling multiple <code>Relay</code>.
 - <code>Nx</code> implement ajax by using <i>XMLHttpRequest</i>.

## Relation library(any.js series)

| Library | Introduction | Requirements |
|:---|:---|
| any.js | Basic methods and UI helper library. | jQuery library |
| najax.js | Simple ajax library. | None |
| nview.js | View template engine. | jQuery library / any.js |

## License
Released under the MIT license. See [LICENSE](../LICENSE).
