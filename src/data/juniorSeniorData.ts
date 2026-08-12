import { PoemItem } from '../types';

export const juniorSeniorData: Omit<PoemItem, 'pinyinWords'>[] = [
  {
    id: 'p-j-1',
    title: '观沧海',
    author: '曹操',
    dynasty: '汉代',
    stage: 'junior',
    grade: '七年级上册',
    category: 'poetry',
    rhythm: '四言乐府诗',
    pinyinTitle: 'guān cāng hǎi',
    content: [
      '东临碣石，以观沧海。',
      '水何澹澹，山岛竦峙。',
      '树木丛生，百草丰茂。',
      '秋风萧瑟，洪波涌起。',
      '日月之行，若出其中；',
      '星汉灿烂，若出其里。',
      '幸甚至哉，歌以咏志。'
    ],
    pinyinContent: [
      'dōng lín jié shí, yǐ guān cāng hǎi.',
      'shuǐ hé dàn dàn, shān dǎo sǒng zhì.',
      'shù mù cóng shēng, bǎi cǎo fēng mào.',
      'qiū fēng xiāo sè, hóng bō yǒng qǐ.',
      'rì yuè zhī xíng, ruò chū qí zhōng;',
      'xīng hàn càn làn, ruò chū qí lǐ.',
      'xìng shèn zhì zāi, gē yǐ yǒng zhì.'
    ],
    notes: [
      { word: '澹澹', meaning: '水波荡漾的样子。' },
      { word: '竦峙', meaning: '高高耸立。' }
    ],
    translation: [
      '向东登上碣石山观赏浩瀚的大海。水波荡漾，山岛高高耸立。',
      '树木繁茂，百草丰茂。秋风呼啸吹过，掀起巨大波浪。',
      '太阳和月亮运行，好像从大海中升起；灿烂的银河群星，也好像从大海里涌现。',
      '庆幸到了极点，用歌唱表达宏伟抱负！'
    ],
    appreciation: '借大海吞吐日月的壮景，展现统一天下、吞吐宇宙的博大胸襟。',
    tags: ['博大', '抱负', '大海', '曹操']
  },
  {
    id: 'p-j-2',
    title: '水调歌头·明月几时有',
    author: '苏轼',
    dynasty: '宋代',
    stage: 'junior',
    grade: '八年级上册',
    category: 'poetry',
    rhythm: '词牌·水调歌头',
    pinyinTitle: 'shuǐ diào gē tóu · míng yuè jǐ shí yǒu',
    content: [
      '明月几时有？把酒问青天。',
      '不知天上宫阙，今夕是何年。',
      '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。',
      '起舞弄清影，何似在人间。',
      '转朱阁，低绮户，照无眠。',
      '不应有恨，何事长向别时圆？',
      '人有悲欢离合，月有阴晴圆缺，此事古难全。',
      '但愿人长久，千里共婵娟。'
    ],
    pinyinContent: [
      'míng yuè jǐ shí yǒu? bǎ jiǔ wèn qīng tiān.',
      'bù zhī tiān shàng gōng què, jīn xī shì hé nián.',
      'wǒ yù chéng fēng guī qù, yòu kǒng qióng lóu yù yǔ, gāo chù bù shèng hán.',
      'qǐ wǔ nòng qīng yǐng, hé sì zài rén jiān.',
      'zhuǎn zhū gé, dī qǐ hù, zhào wú mián.',
      'bù yìng yǒu hèn, hé shì cháng xiàng bié shí yuán?',
      'rén yǒu bēi huān lí hé, yuè yǒu yīn qíng yuán quē, cǐ shì gǔ nán quán.',
      'dàn yuàn rén cháng jiǔ, qiān lǐ gòng chán juān.'
    ],
    notes: [
      { word: '把酒', meaning: '端起酒杯。' },
      { word: '婵娟', meaning: '美好的姿态，此处指明月。' }
    ],
    translation: [
      '明月什么时候会有？我端起酒杯询问青天。不知道天上的宫殿今晚是哪一年。',
      '我想乘风回到天宫，又怕那美玉楼阁太高受不住严寒。起身翩翩起舞赏影，哪里比得上在人间！',
      '月光转过朱红楼阁，低照雕花窗户，照着难以入眠的离人。不该有什么怨恨，为何偏在人们离别时圆呢？',
      '人有悲欢离合，月有阴晴圆缺，这种遗憾自古难全。只愿我们健康长寿，即使相隔千里也能共同赏月。'
    ],
    appreciation: '中秋夜怀念胞弟苏辙作，融哲理、浪漫与真情于一体，被誉为“中秋词冠军”。',
    tags: ['中秋', '月亮', '亲情', '哲理']
  },
  {
    id: 'p-s-1',
    title: '蜀道难（节选）',
    author: '李白',
    dynasty: '唐代',
    stage: 'senior',
    grade: '高中必修',
    category: 'poetry',
    rhythm: '古体诗',
    pinyinTitle: 'shǔ dào nán',
    content: [
      '噫吁嚱，危乎高哉！',
      '蜀道之难，难于上青天！',
      '蚕丛及鱼凫，开国何茫然！',
      '尔来四万八千岁，不与秦塞通人烟。',
      '西当太白有鸟道，可以横绝峨眉巅。',
      '地崩山摧壮士死，然后天梯石栈相钩连。'
    ],
    pinyinContent: [
      'yī xū xī, wēi hū gāo zāi!',
      'shǔ dào zhī nán, nán yú shàng qīng tiān!',
      'cán cóng jí yú fú, kāi guó hé máng rán!',
      'ěr lái sì wàn bā qiān suì, bù yǔ qín sài tōng rén yān.',
      'xī dāng tài bái yǒu niǎo dào, kě yǐ héng jué é méi diān.',
      'dì bēng shān cuī zhuàng shì sǐ, rán hòu tiān tī shí zhàn xiāng gōu lián.'
    ],
    notes: [
      { word: '危', meaning: '高。' },
      { word: '横绝', meaning: '横越。' }
    ],
    translation: [
      '惊叹呼喊，高啊真是太高险了！蜀道之难，比登上青天还要难！',
      '古蜀国开国年代漫长茫然！四万八年来不曾与秦地相通。',
      '西边太白山只有鸟道，可以横越峨眉山顶。地崩山塌壮士牺牲，然后栈道才连接通达。'
    ],
    appreciation: '浪漫主义奇特想象，展现蜀道惊险与雄伟自然奇观。',
    tags: ['蜀道', '壮丽', '李白', '高中']
  }
];
