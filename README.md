najax.js
======

![any series](https://any-js.github.io/assets/any_big.png)


Features
------------

- <b>najax.js</b>. You can use ajax easily and customize request & response behaviors.

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
   <small>(Only $najax.sendex method requires <i>any.js</i> and <i>jQuery</i> library.)</small>

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
| <code>$najax</code> | <u>tutorial-static-najax.html</u> | $najax various methods tutorials. | Yes | Part | - |
| <code>$najax@ex</code> | <u>tutorial-najax-ex.html</u> | $najax.send / $najax.sendex tutorials. | Yes | - | - |
| <code>$najax@helper</code> | <u>tutorial-najax-helper.html</u> | $najax helper methods. | Yes | Yes | - |
| <code>$najax@read</code> | <u>tutorial-najax-read.html</u> | $najax.require / $najax.load / $najax.module tutorials. | Yes | Yes | - |
| <code>$najax@class</code> | <u>tutorial-najax-class.html</u> | Singular / Pager / Reflector class tutorials. | Yes | - | - |
| <code>$najax.history</code> | <u>tutorial-static-history.html</u> | $najax.history tutorials. | Yes | - | - |
| <code>Relay</code> / <code>Linker</code> | <u>tutorial-relaylinker.html</u><br><u>tutorial-rlk-standalone.html</u> | Relay and <i>Linker</i> class tutorials. | Yes | Yes | Yes |
| --- | <u>tutorial-demo-ui-ajax.html</u> | Ajax and UI demo. Used various methods. | - | - | - |


Distributions
------------

For detail, see reference.

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

Relation library(any.js series)
------------


| Library | Introduction | Requirements |
|:---|:---|:---|
| any.js | Basic methods and UI helper library. | jQuery library |
| najax.js | Simple ajax library. | None |
| nview.js | View template engine. | jQuery library / any.js |

License
------------

Released under the MIT license. See [LICENSE](./LICENSE).

ChangeLog
------------

See [CHANGELOG](./CHANGELOG.md).
