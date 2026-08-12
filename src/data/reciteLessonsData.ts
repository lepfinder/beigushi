import { PoemItem } from '../types';

export const reciteLessonsData: Omit<PoemItem, 'pinyinWords'>[] = [
  // --- 统编版/部编版 69篇背诵课文 & 必背古文名篇 ---
  {
    id: 'les-1',
    title: '学弈',
    author: '孟子',
    dynasty: '先秦',
    stage: 'primary',
    grade: '六年级下册',
    category: 'prose',
    rhythm: '文言文',
    pinyinTitle: 'xué yì',
    content: [
      '弈秋，通国之善弈者也。',
      '使弈秋诲二人弈，其一人专心致志，惟弈秋之为听；',
      '一人虽听之，一心以为有鸿鹄将至，思援弓缴而射之。',
      '虽与之俱学，弗若之矣。',
      '为是其智弗若与？曰：非然也。'
    ],
    pinyinContent: [
      'yì qiū, tōng guó zhī shàn yì zhě yě.',
      'shǐ yì qiū huì èr rén yì, qí yī rén zhuān xīn zhì zhì, wéi yì qiū zhī wéi tīng;',
      'yī rén suī tīng zhī, yī xīn yǐ wéi yǒu hóng hú jiāng zhì, sī yuán gōng zhuó ér shè zhī.',
      'suī yǔ zhī jù xué, fú ruò zhī yǐ.',
      'wèi shì qí zhì fú ruò yú? yuē: fēi rán yě.'
    ],
    notes: [
      { word: '弈', meaning: '下棋。' },
      { word: '通国', meaning: '全国。' },
      { word: '诲', meaning: '教导。' },
      { word: '援', meaning: '拉开。' },
      { word: '弗若', meaning: '不如，比不上。' }
    ],
    translation: [
      '弈秋是全国最擅长下棋的人。',
      '让他教两个人下棋，其中一个人专心致志，只听弈秋的教导；',
      '另一个人虽然也在听，心里却一直以为有天鹅要飞过来，想着拉开弓箭去射它。',
      '虽然这两个人在一起学习，后者的成绩却远远不如前者。',
      '是因为他的聪明才智不如别人吗？回答说：并不是这样的。'
    ],
    appreciation: '通过两个人学习下棋的态度与结果对比，说明做事必须专心致志、不可三心二意的道理。',
    tags: ['劝学', '故事', '哲理', '文言文']
  },
  {
    id: 'les-2',
    title: '两小儿辩日',
    author: '列子',
    dynasty: '先秦',
    stage: 'primary',
    grade: '六年级下册',
    category: 'prose',
    rhythm: '文言文',
    pinyinTitle: 'liǎng xiǎo ér biàn rì',
    content: [
      '孔子东游，见两小儿辩斗，问其故。',
      '一儿曰：“我以日始出时去人近，而日中时远也。”',
      '一儿以日初出远，而日中时近也。',
      '一儿曰：“日初出大如车盖，及日中则如盘盂，此不为远者小而近者大乎？”',
      '一儿曰：“日初出沧沧凉凉，及其日中如探汤，此不为近者热而远者凉乎？”',
      '孔子不能决也。两小儿笑曰：“孰为汝多知乎？”'
    ],
    pinyinContent: [
      'kǒng zǐ dōng yóu, jiàn liǎng xiǎo ér biàn dòu, wèn qí gù.',
      'yī ér yuē: "wǒ yǐ rì shǐ chū shí qù rén jìn, ér rì zhōng shí yuǎn yě."',
      'yī ér yǐ rì chū chū yuǎn, ér rì zhōng shí jìn yě.',
      'yī ér yuē: "rì chū chū dà rú chē gài, jí rì zhōng zé rú pán yú, cǐ bù wéi yuǎn zhě xiǎo ér jìn zhě dà hū?"',
      'yī ér yuē: "rì chū chū cāng cāng liáng liáng, jí qí rì zhōng rú tàn tāng, cǐ bù wéi jìn zhě rè ér yuǎn zhě liáng hū?"',
      'kǒng zǐ bù néng jué yě. liǎng xiǎo ér xiào yuē: "shú wéi rǔ duō zhī hū?"'
    ],
    notes: [
      { word: '辩斗', meaning: '争辩，争论。' },
      { word: '去', meaning: '距离。' },
      { word: '探汤', meaning: '把手伸进热水里。汤：热水。' },
      { word: '决', meaning: '判断。' }
    ],
    translation: [
      '孔子向东游历，看到两个小孩在争辩，就询问原因。',
      '一个小孩说：“我认为太阳刚出来时距离人近，而到了中午距离人远。”',
      '另一个小孩认为太阳刚出来时远，而到了中午距离近。',
      '一个小孩说：“太阳刚出来时大得像车盖，到了中午就像盘子，这不是远的小而近的大吗？”',
      '另一个小孩说：“太阳刚出来时清凉寒冷，到了中午就像把手伸进热水里一样热，这不是近的热而远的凉吗？”',
      '孔子无法判定谁对谁错。两个小孩笑着说：“谁说你的知识渊博呢？”'
    ],
    appreciation: '表现了古人探索自然的求知精神，同时赞扬了孔子实事求是的谦逊态度。',
    tags: ['辩论', '探索', '孔子', '文言文']
  },
  {
    id: 'les-3',
    title: '司马光',
    author: '宋史',
    dynasty: '宋代',
    stage: 'primary',
    grade: '三年级上册',
    category: 'prose',
    rhythm: '文言文',
    pinyinTitle: 'sī mǎ guāng',
    content: [
      '司马光七岁，凛然如成人，闻《左氏春秋》，爱之，生众皆不若也。',
      '群儿戏于庭，一儿登瓮，足跌没水中。',
      '众皆弃去，光持石击瓮破之，水迸，儿得活。'
    ],
    pinyinContent: [
      'sī mǎ guāng qī suì, lǐn rán rú chéng rén, wén zuǒ shì chūn qiū, ài zhī, shēng zhòng jiē bù ruò yě.',
      'qún ér xì yú tíng, yī ér dēng wèng, zú diē mò shuǐ zhōng.',
      'zhòng jiē qì qù, guāng chí shí jī wèng pò zhī, shuǐ bèng, ér dé huó.'
    ],
    notes: [
      { word: '瓮', meaning: '陶制的盛水大缸。' },
      { word: '弃去', meaning: '丢下离开。' },
      { word: '迸', meaning: '涌出。' }
    ],
    translation: [
      '司马光七岁时，成熟稳重得像个大人。',
      '一群小孩在庭院里嬉戏，一个小孩爬上水缸，脚下一滑掉进水缸里淹没。',
      '其他小孩吓得跑开了，司马光拿石头砸破水缸，水涌出来，小孩得到了拯救。'
    ],
    appreciation: '赞扬司马光幼年临危不乱、沉着机智的高尚品质，广为流传。',
    tags: ['机智', '故事', '品质', '文言文']
  },
  {
    id: 'les-4',
    title: '守株待兔',
    author: '韩非子',
    dynasty: '先秦',
    stage: 'primary',
    grade: '三年级下册',
    category: 'prose',
    rhythm: '文言文',
    pinyinTitle: 'shǒu zhū dài tù',
    content: [
      '宋人有耕者。田中有株。',
      '兔走触株，折颈而死。',
      '因释其耒而守株，冀复得兔。',
      '兔不可复得，而身为宋国笑。'
    ],
    pinyinContent: [
      'sòng rén yǒu gēng zhě. tián zhōng yǒu zhū.',
      'tù zǒu chù zhū, zhé jǐng ér sǐ.',
      'yīn shì qí lěi ér shǒu zhū, jì fù dé tù.',
      'tù bù kě fù dé, ér shēn wéi sòng guó xiào.'
    ],
    notes: [
      { word: '株', meaning: '树桩。' },
      { word: '耒', meaning: '古代耕地的农具。' },
      { word: '冀', meaning: '希望。' }
    ],
    translation: [
      '宋国有个耕田的农民。田里有一个树桩。',
      '一只兔子奔跑时撞在树桩上，折断了脖子死掉了。',
      '于是这个农民放下农具守在树桩旁，希望再次捡到兔子。',
      '兔子再也没有得到，而他自己却成为了宋国人的笑柄。'
    ],
    appreciation: '讽刺那些不靠努力、妄想侥幸获益或死守狭隘经验的人。',
    tags: ['寓言', '哲理', '故事', '文言文']
  },
  {
    id: 'les-5',
    title: '伯牙鼓琴',
    author: '列子',
    dynasty: '先秦',
    stage: 'primary',
    grade: '六年级上册',
    category: 'prose',
    rhythm: '文言文',
    pinyinTitle: 'bó yá gǔ qín',
    content: [
      '伯牙鼓琴，锺子期听之。',
      '方鼓琴而志在太山，锺子期曰：“善哉乎鼓琴，巍巍乎若太山。”',
      '少选之间而志在流水，锺子期又曰：“善哉乎鼓琴，汤汤乎若流水。”',
      '锺子期死，伯牙破琴绝弦，终身不复鼓琴，以为世无足复为鼓琴者。'
    ],
    pinyinContent: [
      'bó yá gǔ qín, zhōng zǐ qī tīng zhī.',
      'fāng gǔ qín ér zhì zài tài shān, zhōng zǐ qī yuē: "shàn zāi hū gǔ qín, wēi wēi hū ruò tài shān."',
      'shǎo xuǎn zhī jiān ér zhì zài liú shuǐ, zhōng zǐ qī yòu yuē: "shàn zāi hū gǔ qín, shāng shāng hū ruò liú shuǐ."',
      'zhōng zǐ qī sǐ, bó yá pò qín jué xián, zhōng shēn bù fù gǔ qín, yǐ wéi shì wú zú fù wéi gǔ qín zhě.'
    ],
    notes: [
      { word: '鼓', meaning: '弹奏。' },
      { word: '善哉', meaning: '弹得太好了！' },
      { word: '巍巍', meaning: '高大的样子。' },
      { word: '绝弦', meaning: '弄断琴弦。' }
    ],
    translation: [
      '伯牙弹琴，钟子期在旁倾听。',
      '伯牙心里想着高山，钟子期赞叹道：“弹得太好了，高峻得就像泰山一样！”',
      '一会儿伯牙心里想着流水，钟子期又赞叹道：“弹得太好了，浩荡得就像奔流的江河！”',
      '钟子期死后，伯牙摔破古琴摔断琴弦，终生不再弹琴，认为世上再也没有值得他为之弹琴的知音了。'
    ],
    appreciation: '表现真挚难得的知音情谊，“高山流水”成为千古佳话。',
    tags: ['知音', '音乐', '友情', '文言文']
  },
  {
    id: 'les-6',
    title: '少年中国说（节选）',
    author: '梁启超',
    dynasty: '近代',
    stage: 'primary',
    grade: '五年级上册',
    category: 'prose',
    rhythm: '名篇朗诵',
    pinyinTitle: 'shào nián zhōng guó shuō',
    content: [
      '红日初升，其道大光。',
      '河出伏流，一泻汪洋。',
      '潜龙腾渊，鳞爪飞扬。',
      '乳虎啸谷，百兽震惶。',
      '鹰隼试翼，风尘吸张。',
      '奇花初胎，矞矞皇皇。',
      '干将发硎，有作其芒。',
      '天戴其苍，地履其黄。',
      '纵有千古，横有八荒。',
      '美哉我少年中国，与天不老！',
      '壮哉我中国少年，与国无疆！'
    ],
    pinyinContent: [
      'hóng rì chū shēng, qí dào dà guāng.',
      'hé chū fú liú, yī xiè wāng yáng.',
      'qián lóng téng yuān, lín zhǎo fēi yáng.',
      'rǔ hǔ xiào gǔ, bǎi shòu zhèn huáng.',
      'yīng sǔn shì yì, fēng chén xī zhāng.',
      'qí huā chū tāi, yù yù huáng huáng.',
      'gān jiāng fā xíng, yǒu zuò qí máng.',
      'tiān dài qí cāng, dì lǚ qí huáng.',
      'zòng yǒu qiān gǔ, héng yǒu bā huāng.',
      'měi zāi wǒ shào nián zhōng guó, yǔ tiān bù lǎo!',
      'zhuàng zāi wǒ zhōng guó shào nián, yǔ guó wú jiāng!'
    ],
    notes: [
      { word: '汪洋', meaning: '气势浩大。' },
      { word: '干将发硎', meaning: '名剑刚在磨刀石上磨出锋芒。' }
    ],
    translation: [
      '红日刚刚升起，道路一片光明！黄河从地下流出，浩浩荡荡一泻千里！',
      '潜伏的巨龙腾跃深渊，鳞爪飞扬！幼小的猛虎在山谷咆哮，百兽震恐惊慌！',
      '雄鹰展翅试飞，风尘随之吸张！珍奇的花朵刚含苞吐萼，华丽灿烂！',
      '干将宝剑刚刚磨出锋芒，光芒四射！头顶辽阔苍天，脚踏厚重大地！',
      '纵观有千年的历史，横看有八方的广袤！',
      '壮美啊，我的少年中国，与天一样永不衰老！壮丽啊，我的中国少年，与祖国一样前程无量！'
    ],
    appreciation: '气势磅礴，铿锵有力，寄托了对少年与祖国繁荣昌盛的无限宏伟期许。',
    tags: ['爱国', '少年', '励志', '朗诵名篇']
  },
  {
    id: 'les-7',
    title: '匆匆（节选）',
    author: '朱自清',
    dynasty: '现代',
    stage: 'primary',
    grade: '六年级下册',
    category: 'modern',
    rhythm: '现代散文名篇',
    pinyinTitle: 'cōng cōng',
    content: [
      '燕子去了，有再来的时候；',
      '杨柳枯了，有再青的时候；',
      '桃花谢了，有再开的时候。',
      '但是，聪明的，你告诉我，',
      '我们的日子为什么一去不复返呢？',
      '洗手的时候，日子从水盆里过去；',
      '吃饭的时候，日子从饭碗里过去；',
      '默默时，便从凝然的双眼前过去。',
      '我觉察他去得太匆匆了，伸出手遮挽时，',
      '他又从遮挽着的手边过去了。'
    ],
    pinyinContent: [
      'yàn zi qù le, yǒu zài lái de shí hòu;',
      'yáng liǔ kū le, yǒu zài qīng de shí hòu;',
      'táo huā xiè le, yǒu zài kāi de shí hòu.',
      'dàn shì, cōng míng de, nǐ gào sù wǒ,',
      'wǒ men de rì zi wèi shén me yī qù bù fù fǎn ne?',
      'xǐ shǒu de shí hòu, rì zi cóng shuǐ pén lǐ guò qù;',
      'chī fàn de shí hòu, rì zi cóng fàn wǎn lǐ guò qù;',
      'mò mò shí, biàn cóng níng rán de shuāng yǎn qián guò qù.',
      'wǒ jué chá tā qù dé tài cōng cōng le, shēn chū shǒu zhē wǎn shí,',
      'tā yòu cóng zhē wǎn zhe de shǒu biān guò qù le.'
    ],
    notes: [
      { word: '遮挽', meaning: '遮挡挽留。' },
      { word: '凝然', meaning: '发呆凝视的样子。' }
    ],
    translation: [
      '燕子飞走了有再飞回来的时候，杨柳枯萎了有重新泛青的时候，桃花凋谢了有再次开放的时候。',
      '但是聪明的人啊，请你告诉我，我们的时光为什么一去不复返呢？',
      '洗手时时光从水盆中悄悄溜走，吃饭时从饭碗边悄悄溜走，静默时从发呆的眼神前悄悄溜走。',
      '我察觉到时光流逝得太仓促了，伸出手想去挽留，它又从手边悄然溜走了。'
    ],
    appreciation: '语言优美细腻，感叹时光流逝的无情，警示人们珍惜时光。',
    tags: ['珍惜时间', '散文', '名篇', '现代']
  },
  {
    id: 'les-8',
    title: '爱莲说',
    author: '周敦颐',
    dynasty: '宋代',
    stage: 'junior',
    grade: '七年级下册',
    category: 'prose',
    rhythm: '文言文',
    pinyinTitle: 'ài lián shuō',
    content: [
      '水陆草木之花，可爱者甚蕃。',
      '晋陶渊明独爱菊。自李唐来，世人甚爱牡丹。',
      '予独爱莲之出淤泥而不染，濯清涟而不妖，',
      '中通外直，不蔓不枝，香远益清，亭亭净植，',
      '可远观而不可亵玩焉。'
    ],
    pinyinContent: [
      'shuǐ lù cǎo mù zhī huā, kě ài zhě shèn fán.',
      'jìn táo yuān míng dú ài jú. zì lǐ táng lái, shì rén shèn ài mǔ dān.',
      'yú dú ài lián zhī chū yū ní ér bù rǎn, zhuó qīng lián ér bù yāo,',
      'zhōng tōng wài zhí, bù màn bù zhī, xiāng yuǎn yì qīng, tíng tíng jìng zhí,',
      'kě yuǎn guān ér bù kě xiè wán yān.'
    ],
    notes: [
      { word: '蕃', meaning: '多。' },
      { word: '濯', meaning: '洗涤。' },
      { word: '亵玩', meaning: '亲近玩弄。' }
    ],
    translation: [
      '水上和陆地上草木的花，值得喜爱的很多。',
      '晋代陶渊明唯独喜爱菊花。自唐朝以来，世上的人十分喜爱牡丹。',
      '我唯独喜爱莲花从淤泥里生出来却不受污染，在清澈的水波洗涤过却不显妖媚，',
      '茎中间贯通外部挺直，不牵牵连连也不分枝，香气传播得越远越清香，笔直洁净地立在水中，',
      '只可以从远处观赏，却不可以轻易亲近玩弄啊。'
    ],
    appreciation: '托物言志，赞美莲花坚守洁身自好、不与世俗同流合污的高洁君子品格。',
    tags: ['莲花', '君子', '言志', '品质']
  },
  {
    id: 'les-9',
    title: '陋室铭',
    author: '刘禹锡',
    dynasty: '唐代',
    stage: 'junior',
    grade: '七年级下册',
    category: 'prose',
    rhythm: '骈文·铭文',
    pinyinTitle: 'lòu shì míng',
    content: [
      '山不在高，有仙则名。',
      '水不在深，有龙则灵。',
      '斯是陋室，惟吾德馨。',
      '苔痕上阶绿，草色入帘青。',
      '谈笑有鸿儒，往来无白丁。',
      '可以调素琴，阅金经。',
      '无丝竹之乱耳，无案牍之劳形。',
      '南阳诸葛庐，西蜀子云亭。',
      '孔子云：何陋之有？'
    ],
    pinyinContent: [
      'shān bù zài gāo, yǒu xiān zé míng.',
      'shuǐ bù zài shēn, yǒu lóng zé líng.',
      'sī shì lòu shì, wéi wú dé xīn.',
      'tái hén shàng jiē lǜ, cǎo sè rù lián qīng.',
      'tán xiào yǒu hóng rú, wǎng lái wú bái dīng.',
      'kě yǐ tiáo sù qín, yuè jīn jīng.',
      'wú sī zhú zhī luàn ěr, wú àn dú zhī láo xíng.',
      'nán yáng zhū gě lú, xī shǔ zǐ yún tíng.',
      'kǒng zǐ yuún: hé lòu zhī yǒu?'
    ],
    notes: [
      { word: '德馨', meaning: '品德高尚。' },
      { word: '鸿儒', meaning: '大儒，博学之士。' },
      { word: '白丁', meaning: '平民，此处指没有学问的人。' }
    ],
    translation: [
      '山不在于高，有了神仙就会出名。水不在于深，有了娇龙就会灵验。',
      '这是简陋的屋子，只因我的品德高尚就不显得简陋了。',
      '苔藓痕迹长上阶梯一片翠绿，草色映入竹帘一片青翠。',
      '到这里谈笑的都是博学的大儒，往来的没有平庸无知之人。',
      '可以弹奏素朴的古琴，浏览珍贵的佛经。',
      '没有世俗音乐扰乱耳朵，没有公文案牍劳累身体。',
      '就像南阳诸葛亮的草庐，西蜀扬子云的亭子。',
      '孔子说：有什么简陋的呢？'
    ],
    appreciation: '通过对陋室环境与生活的描写，安贫乐道，表达了高洁傲岸的情操。',
    tags: ['安贫乐道', '名篇', '品质', '文言文']
  }
];
