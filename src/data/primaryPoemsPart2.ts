import { PoemItem } from '../types';

export const primaryPoemsPart2: Omit<PoemItem, 'pinyinWords'>[] = [
  // --- 三年级上册 / 下册 ---
  {
    id: 'p-3-1',
    title: '山行',
    author: '杜牧',
    dynasty: '唐代',
    stage: 'primary',
    grade: '三年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'shān xíng',
    content: [
      '远上寒山石径斜，',
      '白云生处有人家。',
      '停车坐爱枫林晚，',
      '霜叶红于二月花。'
    ],
    pinyinContent: [
      'yuǎn shàng hán shān shí jìng xiá,',
      'bái yún shēng chù yǒu rén jiā.',
      'tíng chē zuò ài fēng lín wǎn,',
      'shuāng yè hóng yú èr yuè huā.'
    ],
    notes: [
      { word: '石径斜', meaning: '石头小路弯弯曲曲。' },
      { word: '坐', meaning: '因为。' }
    ],
    translation: [
      '沿着弯曲的石头小路登上深秋的高山，白云缭绕的地方隐约可见人家。',
      '停下车来是因为喜爱傍晚的枫林美景，霜打过的枫叶比二月的鲜花还要红艳！'
    ],
    appreciation: '“霜叶红于二月花”描绘深秋枫林热烈美好的生命力，毫无凄凉感。',
    tags: ['秋天', '枫叶', '写景', '名篇']
  },
  {
    id: 'p-3-2',
    title: '饮湖上初晴后雨',
    author: '苏轼',
    dynasty: '宋代',
    stage: 'primary',
    grade: '三年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'yǐn hú shàng chū qíng hòu yǔ',
    content: [
      '水光潋滟晴方好，',
      '山色空濛雨亦奇。',
      '欲把西湖比西子，',
      '淡妆浓抹总相宜。'
    ],
    pinyinContent: [
      'shuǐ guāng liàn yàn qíng fāng hǎo,',
      'shān sè kōng méng yǔ yì qí.',
      'yù bǎ xī hú bǐ xī zǐ,',
      'dàn zhuāng nóng mǒ zǒng xiāng yí.'
    ],
    notes: [
      { word: '潋滟', meaning: '水波荡漾的样子。' },
      { word: '西子', meaning: '美女西施。' }
    ],
    translation: [
      '晴天里西湖水波荡漾阳光美好，雨天里山色迷茫也神奇独特。',
      '如果把西湖比作美女西施，淡妆或浓抹都十分合适恰当。'
    ],
    appreciation: '把西湖喻为西施，成为古今描写西湖最著名的神来之笔。',
    tags: ['西湖', '名胜', '比喻', '写景']
  },
  {
    id: 'p-3-3',
    title: '望天门山',
    author: '李白',
    dynasty: '唐代',
    stage: 'primary',
    grade: '三年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'wàng tiān mén shān',
    content: [
      '天门中断楚江开，',
      '碧水东流至此回。',
      '两岸青山相对出，',
      '孤帆一片日边来。'
    ],
    pinyinContent: [
      'tiān mén zhōng duàn chǔ jiāng kāi,',
      'bì shuǐ dōng liú zhì cǐ huí.',
      'liǎng àn qīng shān xiāng duì chū,',
      'gū fān yī piàn rì biān lái.'
    ],
    notes: [
      { word: '楚江', meaning: '长江流经湖北安徽段的别称。' },
      { word: '回', meaning: '回旋，改变方向。' }
    ],
    translation: [
      '天门山从中间断开让浩荡长江劈开奔流，碧绿的江水向东流去到这里回旋激荡。',
      '两岸青山在视线中相对耸立突现，一片孤舟正从太阳升起的江边驶来。'
    ],
    appreciation: '气势磅礴地展现天门山斩断长江、江水喷涌激荡的雄伟景象。',
    tags: ['长江', '壮丽', '写景', '名胜']
  },
  {
    id: 'p-3-4',
    title: '元日',
    author: '王安石',
    dynasty: '宋代',
    stage: 'primary',
    grade: '三年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'yuán rì',
    content: [
      '爆竹声中一岁除，',
      '春风送暖入屠苏。',
      '千门万户曈曈日，',
      '总把新桃换旧符。'
    ],
    pinyinContent: [
      'bào zhú shēng zhōng yī suì chú,',
      'chūn fēng sòng nuǎn rù tú sū.',
      'qiān mén wàn hù tóng tóng rì,',
      'zǒng bǎ xīn táo huàn jiù fú.'
    ],
    notes: [
      { word: '屠苏', meaning: '屠苏酒。' },
      { word: '曈曈', meaning: '日出光亮温暖的样子。' }
    ],
    translation: [
      '在阵阵爆竹声中送走了旧的一年，温暖的春风带来了新年，人们畅饮屠苏酒。',
      '旭日的光辉照耀着千家万户，大家总会拿新的桃符换下旧的桃符。'
    ],
    appreciation: '描写欢度新春佳节的喜庆祥和景象，寄托革新除旧的胸怀。',
    tags: ['春节', '节日', '喜庆', '民俗']
  },
  {
    id: 'p-3-5',
    title: '清明',
    author: '杜牧',
    dynasty: '唐代',
    stage: 'primary',
    grade: '三年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'qīng míng',
    content: [
      '清明时节雨纷纷，',
      '路上行人欲断魂。',
      '借问酒家何处有？',
      '牧童遥指杏花村。'
    ],
    pinyinContent: [
      'qīng míng shí jié yǔ fēn fēn,',
      'lù shàng xíng rén yù duàn hún.',
      'jiè wèn jiǔ jiā hé chù yǒu?',
      'mù tóng yáo zhǐ xìng huā cūn.'
    ],
    notes: [
      { word: '欲断魂', meaning: '形容神伤落魄、愁闷消沉。' },
      { word: '借问', meaning: '打听，询问。' }
    ],
    translation: [
      '清明节时细雨绵绵下个不停，路上的旅人心中落寞神伤。',
      '借问一声哪里有歇脚的酒家？牧童向着遥远深处的杏花村轻轻一指。'
    ],
    appreciation: '写清明细雨迷茫中旅人的愁思，色彩清新，意境悠远。',
    tags: ['清明节', '节日', '雨', '情感']
  },
  {
    id: 'p-3-6',
    title: '九月九日忆山东兄弟',
    author: '王维',
    dynasty: '唐代',
    stage: 'primary',
    grade: '三年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'jiǔ yuè jiǔ rì yì shān dōng xiōng dì',
    content: [
      '独在异乡为异客，',
      '每逢佳节倍思亲。',
      '遥知兄弟登高处，',
      '遍插茱萸少一人。'
    ],
    pinyinContent: [
      'dú zài yì xiāng wéi yì kè,',
      'měi féng jiā jié bèi sī qīn.',
      'yáo zhī xiōng dì dēng gāo chù,',
      'biàn chā zhū yú shǎo yī rén.'
    ],
    notes: [
      { word: '九月九日', meaning: '重阳节。' },
      { word: '倍', meaning: '更加。' }
    ],
    translation: [
      '一个人独自在异乡做客，每当遇到佳节时就更加思念亲人。',
      '遥想兄弟们登高远眺时，佩戴茱萸发现唯独少了我一个人。'
    ],
    appreciation: '“每逢佳节倍思亲”表达离家之人共同的真挚思念，千古不朽。',
    tags: ['重阳节', '思乡', '节日', '亲情']
  },
  {
    id: 'p-3-7',
    title: '忆江南',
    author: '白居易',
    dynasty: '唐代',
    stage: 'primary',
    grade: '三年级下册',
    category: 'poetry',
    rhythm: '词牌·忆江南',
    pinyinTitle: 'yì jiāng nán',
    content: [
      '江南好，风景旧曾谙。',
      '日出江花红胜火，',
      '春来江水绿如蓝。',
      '能不忆江南？'
    ],
    pinyinContent: [
      'jiāng nán hǎo, fēng jǐng jiù céng ān.',
      'rì chū jiāng huā hóng shèng huǒ,',
      'chūn lái jiāng shuǐ lǜ rú lán.',
      'néng bù yì jiāng nán?'
    ],
    notes: [
      { word: '谙', meaning: '熟悉。' },
      { word: '蓝', meaning: '蓝草，可以提炼蓝色染料。' }
    ],
    translation: [
      '江南风光真好，那里的美景我早就熟悉。',
      '太阳升起时江边的花朵比火还要红，春天到来时江水碧绿如湛蓝天空。',
      '怎能让人不深深思念江南呢？'
    ],
    appreciation: '红胜火与绿如蓝对比强烈，色彩饱满，抒发对江南春色的无限怀念。',
    tags: ['江南', '写景', '色彩', '春天']
  },

  // --- 四年级上册 / 下册 ---
  {
    id: 'p-4-1',
    title: '暮江吟',
    author: '白居易',
    dynasty: '唐代',
    stage: 'primary',
    grade: '四年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'mù jiāng yín',
    content: [
      '一道残阳铺水中，',
      '半江瑟瑟半江红。',
      '可怜九月初三夜，',
      '露似真珠月似弓。'
    ],
    pinyinContent: [
      'yī dào cán yáng pū shuǐ zhōng,',
      'bàn jiāng sè sè bàn jiāng hóng.',
      'kě lián jiǔ yuè chū sān yè,',
      'lù sì zhēn zhū yuè sì gōng.'
    ],
    notes: [
      { word: '瑟瑟', meaning: '青绿色。' },
      { word: '可怜', meaning: '可爱。' }
    ],
    translation: [
      '夕阳洒在江面上，半边江水呈现青碧色，半边江水被染成鲜红色。',
      '最可爱的要数九月初三的夜晚，晶莹的露珠像珍珠，新月精美得像弯弓。'
    ],
    appreciation: '色彩工丽，观察极其敏锐生动，将暮江月夜刻画得宛如画卷。',
    tags: ['江景', '月夜', '写景', '色彩']
  },
  {
    id: 'p-4-2',
    title: '题西林壁',
    author: '苏轼',
    dynasty: '宋代',
    stage: 'primary',
    grade: '四年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'tí xī lín bì',
    content: [
      '横看成岭侧成峰，',
      '远近高低各不同。',
      '不识庐山真面目，',
      '只缘身在此山中。'
    ],
    pinyinContent: [
      'héng kàn chéng lǐng cè chéng fēng,',
      'yuǎn jìn gāo dī gè bù tóng.',
      'bù shí lú shān zhēn miàn mù,',
      'zhǐ yuán shēn zài cǐ shān zhōng.'
    ],
    notes: [
      { word: '缘', meaning: '因为。' },
      { word: '横看', meaning: '从正面看。' }
    ],
    translation: [
      '正面看横绵成岭，侧面看高耸成峰，从远处、近处、高处、低处看景色各不相同。',
      '之所以不能认清庐山的真实面貌，是因为自己身处在庐山山谷之中啊。'
    ],
    appreciation: '富有深刻哲学启示，警示人们“当局者迷”，唯有超越局部才能全面看清事实。',
    tags: ['哲理', '庐山', '名胜', '名篇']
  },
  {
    id: 'p-4-3',
    title: '出塞',
    author: '王昌龄',
    dynasty: '唐代',
    stage: 'primary',
    grade: '四年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'chū sài',
    content: [
      '秦时明月汉时关，',
      '万里长征人未还。',
      '但使龙城飞将在，',
      '不教胡马度阴山。'
    ],
    pinyinContent: [
      'qín shí míng yuè hàn shí guān,',
      'wàn lǐ cháng zhēng rén wèi huán.',
      'dàn shǐ lóng chéng fēi jiàng zài,',
      'bù jiào hú mǎ dù yīn shān.'
    ],
    notes: [
      { word: '飞将', meaning: '指汉代抗击匈奴名将李广。' },
      { word: '教', meaning: '让，使。' }
    ],
    translation: [
      '明月依然是秦汉时的明月，边关依然是秦汉时的边关，远征万里的将士至今仍未归还。',
      '只要镇守龙城的飞将军李广依然在世，绝不会让侵略的敌骑跨越阴山！'
    ],
    appreciation: '悲壮雄浑，充满深沉的边塞爱国情情与保家卫国的必胜决心。',
    tags: ['边塞', '爱国', '英雄', '名篇']
  },
  {
    id: 'p-4-4',
    title: '凉州词',
    author: '王翰',
    dynasty: '唐代',
    stage: 'primary',
    grade: '四年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'liáng zhōu cí',
    content: [
      '葡萄美酒夜光杯，',
      '欲饮琵琶马上催。',
      '醉卧沙场君莫笑，',
      '古来征战几人回？'
    ],
    pinyinContent: [
      'pú táo měi jiǔ yè guāng bēi,',
      'yù yǐn pí pá mǎ shàng cuī.',
      'zuì wò shā chǎng jūn mò xiào,',
      'gǔ lái zhēng zhàn jǐ rén huí?'
    ],
    notes: [
      { word: '夜光杯', meaning: '用玉石制成的精美酒杯。' },
      { word: '沙场', meaning: '战场。' }
    ],
    translation: [
      '精美的夜光杯里盛满了甘醇的葡萄美酒，刚要痛饮琵琶声就在马上急促催促。',
      '如果醉倒在战场上请君不要发笑，自古以来奔赴沙场征战又有几人能平安回来？'
    ],
    appreciation: '豪迈痛快中透着边塞将士视死如归的悲壮与旷达，动人心魄。',
    tags: ['边塞', '豪迈', '酒', '悲壮']
  },
  {
    id: 'p-4-5',
    title: '夏日绝句',
    author: '李清照',
    dynasty: '宋代',
    stage: 'primary',
    grade: '四年级上册',
    category: 'poetry',
    rhythm: '五言绝句',
    pinyinTitle: 'xià rì jué jù',
    content: [
      '生当作人杰，',
      '死亦为鬼雄。',
      '至今思项羽，',
      '不肯过江东。'
    ],
    pinyinContent: [
      'shēng dàng zuò rén jié,',
      'sǐ yì wéi guǐ xióng.',
      'zhì jīn sī xiàng yǔ,',
      'bù kěn guò jiāng dōng.'
    ],
    notes: [
      { word: '人杰', meaning: '人中的豪杰。' },
      { word: '鬼雄', meaning: '鬼中的英雄。' }
    ],
    translation: [
      '活着应当做人中的豪杰，死了也要做鬼中的英雄。',
      '直到今天人们依然深深怀念西楚霸王项羽，因为他宁死也不肯苟且偷生逃回江东！'
    ],
    appreciation: '铿锵有声，慷慨激昂，借项羽浩气讽刺南偏安苟存，展现刚烈傲骨。',
    tags: ['豪情', '英雄', '气节', '借古讽今']
  },
  {
    id: 'p-4-6',
    title: '清平乐·村居',
    author: '辛弃疾',
    dynasty: '宋代',
    stage: 'primary',
    grade: '四年级下册',
    category: 'poetry',
    rhythm: '词牌·清平乐',
    pinyinTitle: 'qīng píng yuè · cūn jū',
    content: [
      '茅檐低小，溪上青青草。',
      '醉里吴音相媚好，白发谁家翁媪？',
      '大儿锄豆溪东，中儿正织鸡笼。',
      '最喜小儿亡赖，溪头卧剥莲蓬。'
    ],
    pinyinContent: [
      'máo yán dī xiǎo, xī shàng qīng qīng cǎo.',
      'zuì lǐ wú yīn xiāng mèi hǎo, bái fà shéi jiā wēng ǎo?',
      'dà ér chú dòu xī dōng, zhōng ér zhèng zhī jī lóng.',
      'zuì xǐ xiǎo ér wú lài, xī tóu wò bāo lián péng.'
    ],
    notes: [
      { word: '翁媪', meaning: '老翁和老妇。' },
      { word: '亡赖', meaning: '同“顽皮”，顽皮可爱。' }
    ],
    translation: [
      '草屋茅檐低矮小巧，溪边生长着青青绿草。',
      '带着醉意用亲切的吴地方言温柔交谈，那是谁家满头白发的老翁和老妇？',
      '大儿子在溪东的豆地里锄草，二儿子在家里编织鸡笼。',
      '最令人喜欢的是顽皮的小儿子，正趴在溪边趴着剥莲蓬呢。'
    ],
    appreciation: '生动勾勒出一幅温馨和睦的乡村田园生活图景，充满生活情趣。',
    tags: ['乡村', '田园', '亲情', '词']
  },
  {
    id: 'p-4-7',
    title: '芙蓉楼送辛渐',
    author: '王昌龄',
    dynasty: '唐代',
    stage: 'primary',
    grade: '四年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'fú róng lóu sòng xīn jiàn',
    content: [
      '寒雨连江夜入吴，',
      '平明送客楚山孤。',
      '洛阳亲友如相问，',
      '一片冰心在玉壶。'
    ],
    pinyinContent: [
      'hán yǔ lián jiāng yè rù wú,',
      'píng míng sòng kè chǔ shān gū.',
      'luò yáng qīn yǒu rú xiāng wèn,',
      'yī piàn bīng xīn zài yù hú.'
    ],
    notes: [
      { word: '平明', meaning: '黎明，天亮。' },
      { word: '冰心', meaning: '像冰一样晶莹纯洁的心。' }
    ],
    translation: [
      '冰冷的夜雨连绵江面连夜流入吴地，清晨送别友人楚山显得一片孤寂。',
      '洛阳的亲戚朋友如果向你打听询问我，请告诉他们我的心依然像玉壶中的冰块一样晶莹纯洁！'
    ],
    appreciation: '“一片冰心在玉壶”比喻光明磊落、高洁清白的节操，成为千古名句。',
    tags: ['送别', '品格', '高洁', '名篇']
  },
  {
    id: 'p-4-8',
    title: '墨梅',
    author: '王冕',
    dynasty: '元代',
    stage: 'primary',
    grade: '四年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'mò méi',
    content: [
      '我家洗砚池头树，',
      '朵朵花开淡墨痕。',
      '不要人夸好颜色，',
      '只留清气满乾坤。'
    ],
    pinyinContent: [
      'wǒ jiā xǐ yàn chí tóu shù,',
      'duǒ duǒ huā kāi dàn mò hén.',
      'bù yào rén kuā hǎo yán sè,',
      'zhǐ liú qīng qì mǎn qián kūn.'
    ],
    notes: [
      { word: '清气', meaning: '清香，也指高尚的人格。' },
      { word: '乾坤', meaning: '天地间。' }
    ],
    translation: [
      '我家洗砚池边长着一株梅树，朵朵梅花盛开时都带着淡淡墨痕。',
      '它不需要别人夸赞它的颜色娇艳，只求将一股清正香气充盈流淌在天地之间。'
    ],
    appreciation: '咏物言志，以墨梅自喻坚守高洁品格，不求媚俗。',
    tags: ['梅花', '言志', '品质', '高洁']
  },

  // --- 五年级上册 / 下册 ---
  {
    id: 'p-5-1',
    title: '示儿',
    author: '陆游',
    dynasty: '宋代',
    stage: 'primary',
    grade: '五年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'shì ér',
    content: [
      '死去元知万事空，',
      '但悲不见九州同。',
      '王师北定中原日，',
      '家祭无忘告乃翁。'
    ],
    pinyinContent: [
      'sǐ qù yuán zhī wàn shì kōng,',
      'dàn bēi bù jiàn jiǔ zhōu tóng.',
      'wáng shī běi dìng zhōng yuán rì,',
      'jiā jì wú wàng gào nǎi wēng.'
    ],
    notes: [
      { word: '九州同', meaning: '全国统一。' },
      { word: '乃翁', meaning: '你的父亲。' }
    ],
    translation: [
      '原本就知道人死之后万事皆空，唯独悲伤未能亲眼见到国家统一。',
      '当朝廷军队收复中原的那一天，家祭时千万不要忘记把这个喜讯告诉你们的父亲！'
    ],
    appreciation: '陆游临终前的绝笔诗，凝聚了至死不渝的爱国赤子之心，悲壮感人。',
    tags: ['爱国', '绝笔', '陆游', '抱负']
  },
  {
    id: 'p-5-2',
    title: '题临安邸',
    author: '林升',
    dynasty: '宋代',
    stage: 'primary',
    grade: '五年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'tí lín ān dǐ',
    content: [
      '山外青山楼外楼，',
      '西湖歌舞几时休？',
      '暖风熏得游人醉，',
      '直把杭州作汴州。'
    ],
    pinyinContent: [
      'shān wài qīng shān lóu wài lóu,',
      'xī hú gē wǔ jǐ shí xiū?',
      'nuǎn fēng xūn dé yóu rén zuì,',
      'zhí bǎ háng zhōu zuò biàn zhōu.'
    ],
    notes: [
      { word: '休', meaning: '停止。' },
      { word: '汴州', meaning: '北宋国都开封。' }
    ],
    translation: [
      '青山之外还有青山，高楼之外更有高楼，西湖边上的歌舞要到什么时候才会休止？',
      '靡靡暖风吹得那些醉生梦死统治者沉醉，竟然直接把杭州当作了昔日沦陷的国都汴州！'
    ],
    appreciation: '讽刺南宋统治者偏安江南、不思收复失地的沉湎享乐，辛辣深刻。',
    tags: ['爱国', '讽刺', '历史', '名篇']
  },
  {
    id: 'p-5-3',
    title: '枫桥夜泊',
    author: '张继',
    dynasty: '唐代',
    stage: 'primary',
    grade: '五年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'fēng qiáo yè bó',
    content: [
      '月落乌啼霜满天，',
      '江枫渔火对愁眠。',
      '姑苏城外寒山寺，',
      '夜半钟声到客船。'
    ],
    pinyinContent: [
      'yuè luò wū tí shuāng mǎn tiān,',
      'jiāng fēng yú huǒ duì chóu mián.',
      'gū sū chéng wài hán shān sì,',
      'yè bàn zhōng shēng dào kè chuán.'
    ],
    notes: [
      { word: '对愁眠', meaning: '伴着愁绪难以入眠。' },
      { word: '姑苏', meaning: '苏州。' }
    ],
    translation: [
      '月亮西沉乌鸦啼鸣霜气漫天，面对江边枫树与渔火怀着愁绪难以入眠。',
      '姑苏城外那古老的寒山寺，半夜里悠扬的钟声传到了我乘坐的客船。'
    ],
    appreciation: '写羁旅孤思，将声、色、景、情完美交融，寒山寺夜半钟声成为千古绝唱。',
    tags: ['夜景', '思乡', '寒山寺', '名篇']
  },
  {
    id: 'p-5-4',
    title: '黄鹤楼送孟浩然之广陵',
    author: '李白',
    dynasty: '唐代',
    stage: 'primary',
    grade: '五年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'huáng hè lóu sòng mèng hào rán zhī guǎng líng',
    content: [
      '故人西辞黄鹤楼，',
      '烟花三月下扬州。',
      '孤帆远影碧空尽，',
      '唯见长江天际流。'
    ],
    pinyinContent: [
      'gù rén xī cí huáng hè lóu,',
      'yān huā sān yuè xià yáng zhōu.',
      'gū fān yuǎn yǐng bì kōng jìn,',
      'wéi jiàn cháng jiāng tiān jì liú.'
    ],
    notes: [
      { word: '烟花', meaning: '指春光明媚、繁花似锦的盛景。' },
      { word: '碧空尽', meaning: '消失在蔚蓝的天空边缘。' }
    ],
    translation: [
      '老朋友在黄鹤楼向我西辞告别，在繁花似锦的三月春光里前往扬州。',
      '友人的孤舟远影渐渐消失在蔚蓝天际，只看见浩荡长江水向着天边奔流。'
    ],
    appreciation: '情景交融，把对挚友的不舍寄托于无际长江水，意境辽阔高远。',
    tags: ['送别', '友情', '长江', '黄鹤楼']
  },

  // --- 六年级上册 / 下册 ---
  {
    id: 'p-6-1',
    title: '泊船瓜洲',
    author: '王安石',
    dynasty: '宋代',
    stage: 'primary',
    grade: '六年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'bó chuán guā zhōu',
    content: [
      '京口瓜洲一水间，',
      '钟山只隔数重山。',
      '春风又绿江南岸，',
      '明月何时照我还？'
    ],
    pinyinContent: [
      'jīng kǒu guā zhōu yī shuǐ jiān,',
      'zhōng shān zhǐ gé shù chóng shān.',
      'chūn fēng yòu lǜ jiāng nán àn,',
      'míng yuè hé shí zhào wǒ huán?'
    ],
    notes: [
      { word: '绿', meaning: '吹绿（名作动）。' },
      { word: '还', meaning: '回到故乡。' }
    ],
    translation: [
      '京口和瓜洲之间只隔着一条长江，钟山也仅仅隔着几座山头。',
      '温暖的春风又吹绿了江南岸边的大地，天上的明月什么时候才能照着我回到家乡呢？'
    ],
    appreciation: '“绿”字炼字流传千古，极其生动展现了春风过处万物复苏的蓬勃气象。',
    tags: ['思乡', '炼字', '春风', '经典']
  },
  {
    id: 'p-6-2',
    title: '竹石',
    author: '郑燮',
    dynasty: '清代',
    stage: 'primary',
    grade: '六年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'zhú shí',
    content: [
      '咬定青山不放松，',
      '立根原在破岩中。',
      '千磨万击还坚劲，',
      '任尔东西南北风。'
    ],
    pinyinContent: [
      'yǎo dìng qīng shān bù fàng sōng,',
      'lì gēn yuán zài pò yán zhōng.',
      'qiān mó wàn jī hái jiān jìng,',
      'rèn ěr dōng xī nán běi fēng.'
    ],
    notes: [
      { word: '坚劲', meaning: '坚强有韧劲。' },
      { word: '任尔', meaning: '任凭你。' }
    ],
    translation: [
      '竹子紧紧咬住青山丝毫不用松开，它的根深深扎在破裂的岩石缝隙中。',
      '经历无数次的磨难击打依然坚强挺拔，任凭你东南西北风肆意狂吹！'
    ],
    appreciation: '托物言志，赞美竹子扎根破岩不屈不挠、刚正不阿的浩然骨气。',
    tags: ['竹子', '言志', '励志', '骨气']
  },
  {
    id: 'p-6-3',
    title: '石灰吟',
    author: '于谦',
    dynasty: '明代',
    stage: 'primary',
    grade: '六年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'shí huī yín',
    content: [
      '千锤万凿出深山，',
      '烈火焚烧若等闲。',
      '粉骨碎身浑不怕，',
      '要留清白在人间。'
    ],
    pinyinContent: [
      'qiān chuí wàn záo chū shēn shān,',
      'liè huǒ fén shāo ruò děng xián.',
      'fěn gǔ suì shēn hún bù pà,',
      'yào liú qīng bái zài rén jiān.'
    ],
    notes: [
      { word: '若等闲', meaning: '好像很平常。' },
      { word: '清白', meaning: '指坚贞洁白的品质操守。' }
    ],
    translation: [
      '经过千万次的锤打凿击才从深山中开采出来，把熊熊烈火的焚烧看得很平常。',
      '哪怕粉身碎骨也丝毫不用害怕，只要能把清清白白的操守留在人间！'
    ],
    appreciation: '明代英雄于谦以石灰自喻，彰显视死如归、坚守凛然清白的至高风骨。',
    tags: ['品质', '正气', '言志', '英雄']
  },
  {
    id: 'p-6-4',
    title: '江南春',
    author: '杜牧',
    dynasty: '唐代',
    stage: 'primary',
    grade: '六年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'jiāng nán chūn',
    content: [
      '千里莺啼绿映红，',
      '水村山郭酒旗风。',
      '南朝四百八十寺，',
      '多少楼台烟雨中。'
    ],
    pinyinContent: [
      'qiān lǐ yīng tí lǜ yìng hóng,',
      'shuǐ cūn shān guō jiǔ qí fēng.',
      'nán cháo sì bǎi bā shí sì,',
      'duō shǎo lóu tái yān yǔ zhōng.'
    ],
    notes: [
      { word: '山郭', meaning: '依山建造的城郭。' },
      { word: '酒旗', meaning: '酒招子，招揽顾客的旗帜。' }
    ],
    translation: [
      '千里江南黄莺啼鸣绿树红花相映，依水村庄靠山城郭酒旗随风招展。',
      '南朝遗留下来的四百八十座古寺，如今有多少楼台隐没在迷蒙的春雨之中呢！'
    ],
    appreciation: '不仅展现了江南春景的广阔辽远与明艳生机，更寄托了怀古伤今的历史感叹。',
    tags: ['江南', '写景', '春天', '怀古']
  }
];
