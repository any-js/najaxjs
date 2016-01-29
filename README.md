[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

najaxjs
======

![any series](https://any-js.github.io/assets/any_big.png) &nbsp; [https://any-js.github.io/](https://any-js.github.io/)


Features
------------

- <b>najaxjs</b>. You can use ajax easily and customize request & response behaviors.

- Supported _response-type_ is <code>raw text / json / jsonp / html / script / csv / or others...</code>
  And it has many ajax options, <code>async / sync / retry / timeout / cache / or others</code> by <code>Nx object</code>.

- Cross-domain requests supported by <code>$najax.scriptTag / $najax.jsonpTag</code>.

- There are various helper methods, <code>$najax.url</code>, <code>$najax.query</code>, <i>$najax.submit</i>.
  And <code>$najax@helper, Singular, Pager, Reflector classes</code> support 'ajax + ui'.

- <code>$najax.history</code> can easily operate url-history(push / replace / listen).

- <code>Relay</code> / <code>Linker</code> class. It can bundle responses.

Requirements
------------

- <b>None.</b>  <u>Any other library is unnecessary.</u><br>
   <small>(Only $najax.sendex method requires <i>anyjs</i> and <i>jQuery</i> library.)</small>

Browser Support
------------

- Modern web-browsers(Chrome, IE, Firefox, Safari, Opera) support.
- IE browser: Support IE9.  Loose support in IE8. (You can use most of the functions.)
- Legacy browser partially support.

Basic usage(code example)
------------

```javascript
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

Tutorials / Demos / Reference
------------

There are many tutorials.

| Reference | Tutorial | Description | Default ver | Tiny ver | RLK ver |
|:---|:---|:---|:---|:---|:---|
| <code>$najax</code> | [tutorial-static-najax.html](https://any-js.github.io/any-js/najaxjs/docs/tutorial-static-najax.html) | $najax various methods tutorials. | Yes | Part | - |
| <code>$najax@ex</code> | [tutorial-najax-ex.html](https://any-js.github.io/any-js/najaxjs/docs/tutorial-najax-ex.html) | $najax.send / $najax.sendex tutorials. | Yes | - | - |
| <code>$najax@helper</code> | [tutorial-najax-helper.html](https://any-js.github.io/any-js/najaxjs/docs/tutorial-najax-helper.html) | $najax helper methods. | Yes | Yes | - |
| <code>$najax@read</code> | [tutorial-najax-read.html](https://any-js.github.io/any-js/najaxjs/docs/tutorial-najax-read.html) | $najax.require / $najax.load / $najax.module tutorials. | Yes | Yes | - |
| <code>$najax@class</code> | [tutorial-najax-class.html](https://any-js.github.io/any-js/najaxjs/docs/tutorial-najax-class.html) | Singular / Pager / Reflector class tutorials. | Yes | - | - |
| <code>$najax.history</code> | [tutorial-static-history.html](https://any-js.github.io/any-js/najaxjs/docs/tutorial-static-history.html) | $najax.history tutorials. | Yes | - | - |
| <code>Relay</code> / <code>Linker</code> | [tutorial-relaylinker.html](https://any-js.github.io/any-js/najaxjs/docs/tutorial-relaylinker.html) <br> [tutorial-rlk-standalone.html](https://any-js.github.io/any-js/najaxjs/docs/tutorial-rlk-standalone.html) | Relay and <i>Linker</i> class tutorials. | Yes | Yes | Yes |
| --- | [tutorial-demo-ui-ajax.html](https://any-js.github.io/any-js/najaxjs/docs/tutorial-demo-ui-ajax.html) | Ajax and UI demo. Used various methods. | - | - | - |


Distributions
------------

For detail, see reference. In <i>dist</i> directory,

| Distribution | Introduction |
|:---|:---|
| najax.js / najax.min.js | Default version. |
| najax-tiny.js / najax-tiny.min.js | Tiny version. Not include the below.<br><br><code>$najax.history</code><br><code>$najax.send</code> / <code>$najax.sendex</code><br><code>$najax.scriptTag</code> / <code>$najax.jsonpTag</code><br><code>$najax@class(Singular, Pager, Reflector)</code> |
| rlk.js / rlk.min.js | Relay / Linker standalone version. |


<a id="response-type"></a>

Ajax response type
------------

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


Nx class specification
------------

Nx class. This class is created automatically by $najax various method.

 <b>Specification</b><br>
 - Specify ajax request and response behaviors by <code>Nx object</code>.
 - Specify by Nx object's various method or <code>Nx <i>opt</i></code> method.
 - Begin ajax connection by <code>Nx <i>done</i></code>.
 - <code>Nx <i>done</i></code> returns <code>Relay object</code>.
 - <code>Relay</code> provide operating response-data, and bundling multiple <code>Relay</code>.
 - <code>Nx</code> implement ajax by using <i>XMLHttpRequest</i>.

Relation library(any-js series)
------------

| Library | Introduction | Requirements |
|:---|:---|:---|
| anyjs | Basic methods and UI helper library. | jQuery library |
| najaxjs | Simple ajax library. | None |
| nviewjs | View template engine. | jQuery library / anyjs |

License
------------

Released under the MIT license. See [LICENSE](./LICENSE).

ChangeLog
------------

See [CHANGELOG](./CHANGELOG.md).
