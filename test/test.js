const getUUID = require('../index')
const mocha = require('mocha')
const expect = require('chai').expect
const logText = require('./longText')

describe('Test algorithm no changes', function () {
  it('Empty string', function () {
    expect(getUUID(''))
      .to.equal('00000000-0000-4000-8000-000000000000')
  })

  it('One char string', function () {
    expect(getUUID('.'))
      .to.equal('565E8432-1FB2-4687-8338-5B8E3A56C6CF')
  })

  it('Short string', function () {
    expect(getUUID('Hello, world!'))
      .to.equal('92786D7E-B695-462F-809A-816218C24EFC')
  })

  it('Short string utf-8', function () {
    expect(getUUID('Привет, мир!'))
      .to.equal('4E07E9E1-B6F0-452F-A358-312606BD682A')
  })

  it('Long string', function () {
    var str = `Donec sit amet vestibulum ante. Donec semper ante et odio imperdiet viverra. Vestibulum non lectus ac urna ultricies dictum. Maecenas non elementum purus. Donec non ex pharetra, volutpat arcu sit amet, vulputate diam. Nulla gravida eros ac condimentum cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius ipsum neque, ac eleifend metus interdum nec. Nullam cursus leo quis faucibus cursus. Ut fermentum, enim commodo hendrerit iaculis, magna felis fermentum nulla, nec malesuada lorem nulla sed nunc. Cras id ex posuere, tristique mi quis, malesuada libero.
    Etiam pulvinar ex vitae velit accumsan ullamcorper. Vestibulum fringilla euismod vehicula. Donec cursus odio sed mauris consequat congue. Vestibulum vel sapien bibendum quam porttitor molestie et sed diam. Fusce ac ullamcorper eros. Donec a nibh sed urna laoreet imperdiet et ac nisl. Ut at rutrum urna. Praesent vel leo diam. Etiam suscipit auctor tincidunt. Aenean pretium, eros quis lacinia ultricies, sapien turpis ultricies lorem, sit amet porta mi odio ut elit. Sed a enim nunc.
    Vestibulum eu dapibus augue. Vivamus luctus ipsum in hendrerit lacinia. Sed purus turpis, ultrices a nibh a, aliquam lacinia nibh. Proin aliquet nunc purus, vel elementum turpis consequat scelerisque. Proin ornare nibh et ultrices lacinia. Nulla sed dictum velit, eu accumsan arcu. Phasellus elit augue, hendrerit vel accumsan sit amet, tempor sit amet est. Nulla facilisi. Curabitur tempus lorem arcu, id mollis elit tristique at. Duis vel bibendum felis. Phasellus vestibulum in arcu in dictum. Vestibulum sit amet interdum nisi. Fusce et lorem tortor. In id condimentum ante. Ut ac erat posuere, convallis sem a, convallis lacus.
    Sed purus nulla, rhoncus in malesuada vel, cursus ut velit. Nunc et odio eu nibh tristique consequat. Phasellus gravida neque vitae lorem hendrerit, sed efficitur quam porta. Nam varius odio ac sem fermentum tempor. Phasellus nunc mauris, fermentum at lobortis eget, ultricies sollicitudin sem. Mauris non arcu at metus rutrum ullamcorper eget eget turpis. Nulla mi quam, venenatis vel pharetra sed, viverra sit amet lacus. Sed orci justo, faucibus sit amet quam ac, pulvinar porta dui. Nunc placerat erat nec mauris ullamcorper, vel tempor lacus sagittis. Nunc nibh magna, vehicula at dui et, finibus consequat ipsum.`
    expect(getUUID(str))
      .to.equal('2922F43A-2BDC-4D2F-84EC-278473F4E7DA')
  })
})

describe('Self equaling generated UUID', function () {
  describe('Short strings', function () {
    it('Morbi sit amet lobortis libero', function () {
      var str = 'Morbi sit amet lobortis libero'
      expect(getUUID(str)).to.equal(getUUID(str))
    })

    it('In euismod vestibulum risus', function () {
      var str = 'In euismod vestibulum risus'
      expect(getUUID(str)).to.equal(getUUID(str))
    })

    it('Sed dui tortor, faucibus in ex varius', function () {
      var str = 'Sed dui tortor, faucibus in ex varius'
      expect(getUUID(str)).to.equal(getUUID(str))
    })
  })

  describe('Long strings', function () {
    it('Sed dui tortor, faucibus in ex varius...', function () {
      var str = 'Sed dui tortor, faucibus in ex varius, placerat cursus arcu. Maecenas molestie lacus tempor nisl porttitor semper non ac erat. Ut feugiat semper elit, sed semper metus placerat eu. Sed semper tristique ipsum, quis ornare ipsum fermentum eu. Aenean tristique ante eu blandit efficitur. Vestibulum consectetur enim quis mollis sagittis. Duis in sapien nec eros eleifend suscipit. Quisque tristique maximus libero eu iaculis. Cras pharetra venenatis neque, vel venenatis ex tristique sed. Vestibulum mollis felis vel vulputate ultricies. Phasellus quis faucibus enim, ut vestibulum elit. Quisque congue id sapien ac consectetur.'
      expect(getUUID(str)).to.equal(getUUID(str))
    })

    it('Etiam pulvinar ex vitae velit accumsan...', function () {
      var str = `Etiam pulvinar ex vitae velit accumsan ullamcorper. Vestibulum fringilla euismod vehicula. Donec cursus odio sed mauris consequat congue.`
      expect(getUUID(str)).to.equal(getUUID(str))
    })

    it('Lorem ipsum dolor sit amet, consectetur...', function () {
      var str = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut commodo condimentum ante sed cursus`
      expect(getUUID(str)).to.equal(getUUID(str))
    })
  })

  describe('Long strings utf-8', function () {
    it('ヒューマニズムは、イデオ...', function () {
      var str = 'ヒューマニズムは、イデオロギー的ヒューマニズムを発見します。多くの国では、フランスの最も例示的な例その中で、個人崇拝は政治文化の英米の種類を証明しています。社会経済発展は、伝統的な概念によると、国民投票を決定します。特に政治的不安定の状態でパワーのメカニズム、不均一。それは逆説的に見えるかもしれませんように政治的な紛争管理は、一意の機能キリスト教民主主義ナショナリズムです。近代化の概念は、マルクス主義を証明しています。'
      expect(getUUID(str)).to.equal(getUUID(str))
    })

    it('Конфедерация теоретически символизирует...', function () {
      var str = 'Конфедерация теоретически символизирует функциональный тоталитарный тип политической культуры. Либерализм,несмотря на внешние воздействия, доказывает современный кризис легитимности, о чем будет подробнее сказано ниже. По сути, понятие модернизации вызывает современный коммунизм. Форма политического сознания определяет эмпирический субъект власти. Идея правового государства неизбежна. Либерализм неизменяем. Как уже отмечалось, политическая система предсказуема. Политическое учение Н. Макиавелли верифицирует антропологический феномен толпы. Кризис легитимности интегрирует идеологический элемент политического процесса.'
      expect(getUUID(str)).to.equal(getUUID(str))
    })
  })

  describe('Longest strings', function () {
    it('Lorem ipsum dolor sit amet...', function () {
      var str = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut commodo condimentum ante sed cursus. Sed sit amet tellus at augue auctor vulputate a sit amet tortor. Donec vitae est lacinia, pharetra erat quis, faucibus risus. Phasellus ligula ex, luctus ac mauris eget, posuere tempus elit. Cras neque tortor, condimentum in risus vel, rhoncus tincidunt justo. Nunc commodo lobortis pretium. Integer elit arcu, egestas quis viverra a, finibus eget tellus. Sed dapibus finibus elit, eu congue arcu finibus mattis. Sed aliquet accumsan nunc. Integer ac urna scelerisque felis lacinia bibendum. Suspendisse aliquet pellentesque magna eu fringilla. Fusce ultrices ultrices consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id rutrum est. Pellentesque semper molestie turpis, eu laoreet nulla elementum eget. Morbi id mauris magna. In nec posuere est. Cras vestibulum orci sit amet erat commodo tincidunt. Cras et sem finibus metus vehicula hendrerit in id diam. Mauris eu mi eu lacus maximus ullamcorper sit amet in sem. Morbi euismod nibh diam, congue semper odio placerat nec. Donec elementum risus eros, ac rutrum felis luctus vitae. Pellentesque hendrerit dolor a sem malesuada elementum. Vivamus euismod nibh ac mi mattis, quis ultricies mi luctus. Sed ut velit non risus consequat scelerisque vehicula a neque. Vivamus ut elementum elit, a venenatis elit. Maecenas placerat tellus ac bibendum facilisis. Duis at felis nec leo dapibus consequat a nec lectus. Cras sed libero ut nibh iaculis dignissim. Aliquam tincidunt sit amet lacus in rhoncus. Suspendisse a justo eu mauris elementum aliquet. Nunc vitae egestas risus, sed cursus tortor. Quisque a iaculis leo. Vivamus eget sodales est. Nunc sed lectus sed dui tincidunt aliquam sagittis vel metus. Cras faucibus neque eu leo blandit finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi quis imperdiet tellus. Sed at metus magna. Donec molestie erat eu leo tincidunt pharetra. Etiam varius dolor ut laoreet euismod. Suspendisse egestas diam et aliquam dapibus. Nam consequat iaculis magna, in luctus sapien dapibus ac. Curabitur congue enim orci. Aenean dictum dolor et mauris ornare, vel ornare turpis vehicula. Nunc ut rhoncus ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum non dictum leo. Ut non vehicula justo, sed fringilla lorem. Proin faucibus aliquam turpis, vitae ultrices lorem tincidunt mollis. Donec a eros ut metus eleifend rutrum. Vivamus quis pellentesque justo, id malesuada dui. In gravida turpis tortor, et dignissim mauris congue vitae. Etiam dolor sem, eleifend eget interdum id, fringilla at ligula. Vestibulum et maximus nibh. Aenean urna mi, rhoncus a pharetra et, pretium ut tortor. Mauris efficitur velit at laoreet pharetra. Aliquam bibendum lobortis eros, a placerat magna imperdiet sed. Etiam egestas, tortor sed sodales bibendum, lectus magna lacinia tortor, at sollicitudin dui massa eget lorem.`
      expect(getUUID(str)).to.equal(getUUID(str))
    })

    it('Donec sit amet vestibulum ante...', function () {
      var str = `Donec sit amet vestibulum ante. Donec semper ante et odio imperdiet viverra. Vestibulum non lectus ac urna ultricies dictum. Maecenas non elementum purus. Donec non ex pharetra, volutpat arcu sit amet, vulputate diam. Nulla gravida eros ac condimentum cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius ipsum neque, ac eleifend metus interdum nec. Nullam cursus leo quis faucibus cursus. Ut fermentum, enim commodo hendrerit iaculis, magna felis fermentum nulla, nec malesuada lorem nulla sed nunc. Cras id ex posuere, tristique mi quis, malesuada libero. Etiam pulvinar ex vitae velit accumsan ullamcorper. Vestibulum fringilla euismod vehicula. Donec cursus odio sed mauris consequat congue. Vestibulum vel sapien bibendum quam porttitor molestie et sed diam. Fusce ac ullamcorper eros. Donec a nibh sed urna laoreet imperdiet et ac nisl. Ut at rutrum urna. Praesent vel leo diam. Etiam suscipit auctor tincidunt. Aenean pretium, eros quis lacinia ultricies, sapien turpis ultricies lorem, sit amet porta mi odio ut elit. Sed a enim nunc. Vestibulum eu dapibus augue. Vivamus luctus ipsum in hendrerit lacinia. Sed purus turpis, ultrices a nibh a, aliquam lacinia nibh. Proin aliquet nunc purus, vel elementum turpis consequat scelerisque. Proin ornare nibh et ultrices lacinia. Nulla sed dictum velit, eu accumsan arcu. Phasellus elit augue, hendrerit vel accumsan sit amet, tempor sit amet est. Nulla facilisi. Curabitur tempus lorem arcu, id mollis elit tristique at. Duis vel bibendum felis. Phasellus vestibulum in arcu in dictum. Vestibulum sit amet interdum nisi. Fusce et lorem tortor. In id condimentum ante. Ut ac erat posuere, convallis sem a, convallis lacus. Sed purus nulla, rhoncus in malesuada vel, cursus ut velit. Nunc et odio eu nibh tristique consequat. Phasellus gravida neque vitae lorem hendrerit, sed efficitur quam porta. Nam varius odio ac sem fermentum tempor. Phasellus nunc mauris, fermentum at lobortis eget, ultricies sollicitudin sem. Mauris non arcu at metus rutrum ullamcorper eget eget turpis. Nulla mi quam, venenatis vel pharetra sed, viverra sit amet lacus. Sed orci justo, faucibus sit amet quam ac, pulvinar porta dui. Nunc placerat erat nec mauris ullamcorper, vel tempor lacus sagittis. Nunc nibh magna, vehicula at dui et, finibus consequat ipsum.`
      expect(getUUID(str)).to.equal(getUUID(str))
    })
  })
})

describe('Speed of one generation', function() {
  it('100k chars', function() {
    getUUID(logText)
  })
})
