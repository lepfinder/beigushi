import { PoemItem } from '../types';

export const primaryPoemsPart1: Omit<PoemItem, 'pinyinWords'>[] = [
  // --- 一年级上册 ---
  {
    id: 'p-1-1',
    title: '咏鹅',
    author: '骆宾王',
    dynasty: '唐代',
    stage: 'primary',
    grade: '一年级上册',
    category: 'poetry',
    rhythm: '五言古诗',
    pinyinTitle: 'yǒng é',
    content: [
      '鹅，鹅，鹅，',
      '曲项向天歌。',
      '白毛浮绿水，',
      '红掌拨清波。'
    ],
    pinyinContent: [
      'é, é, é,',
      'qū xiàng xiàng tiān gē.',
      'bái máo fú lǜ shuǐ,',
      'hóng zhǎng bō qīng bō.'
    ],
    notes: [
      { word: '咏', meaning: '用诗词等形式赞美、歌咏。' },
      { word: '曲项', meaning: '弯曲的脖子。' },
      { word: '拨', meaning: '划动。' }
    ],
    translation: [
      '大鹅啊，大鹅，大鹅！',
      '弯曲着脖子朝向天空高声歌唱。',
      '洁白的羽毛漂浮在碧绿的水面上，',
      '红色的脚掌划动着清澈的水波。'
    ],
    appreciation: '《咏鹅》是初唐诗人骆宾王七岁时创作的一首经典咏物诗。全诗色彩鲜明，声色并茂，形象地描绘了大鹅戏水时的欢快姿态，天真活泼，充满童趣。',
    background: '相传骆宾王七岁时，家中客人指着池塘里的鹅让他作诗，骆宾王即景生情，脱口而出。',
    tags: ['动物', '写景', '启蒙', '色彩']
  },
  {
    id: 'p-1-2',
    title: '江南',
    author: '汉乐府',
    dynasty: '汉代',
    stage: 'primary',
    grade: '一年级上册',
    category: 'poetry',
    rhythm: '汉乐府民歌',
    pinyinTitle: 'jiāng nán',
    content: [
      '江南可采莲，',
      '莲叶何田田。',
      '鱼戏莲叶间。',
      '鱼戏莲叶东，',
      '鱼戏莲叶西，',
      '鱼戏莲叶南，',
      '鱼戏莲叶北。'
    ],
    pinyinContent: [
      'jiāng nán kě cǎi lián,',
      'lián yè hé tián tián.',
      'yú xì lián yè jiān.',
      'yú xì lián yè dōng,',
      'yú xì lián yè xī,',
      'yú xì lián yè nán,',
      'yú xì lián yè běi.'
    ],
    notes: [
      { word: '田田', meaning: '形容莲叶茂盛相连的样子。' },
      { word: '戏', meaning: '嬉戏，游玩。' }
    ],
    translation: [
      '江南是个采莲的好地方，荷叶生长得多么茂盛舒展啊！',
      '鱼儿在荷叶之间欢快地嬉戏玩耍。',
      '鱼儿一会儿游到荷叶东边，一会儿游到西边，一会儿游到南边，一会儿游到北边。'
    ],
    appreciation: '这是一首汉代江南采莲民歌。诗歌句式重叠反复，充满民歌的韵律美，衬托出采莲人欢快的心情和水乡生机。',
    tags: ['写景', '水乡', '植物', '欢快']
  },
  {
    id: 'p-1-3',
    title: '画',
    author: '王维',
    dynasty: '唐代',
    stage: 'primary',
    grade: '一年级上册',
    category: 'poetry',
    rhythm: '五言绝句',
    pinyinTitle: 'huà',
    content: [
      '远看山有色，',
      '近听水无声。',
      '春去花还在，',
      '人来鸟不惊。'
    ],
    pinyinContent: [
      'yuǎn kàn shān yǒu sè,',
      'jìn tīng shuǐ wú shēng.',
      'chūn qù huā hái zài,',
      'rén lái niǎo bù jīng.'
    ],
    notes: [
      { word: '色', meaning: '颜色，色彩。' },
      { word: '惊', meaning: '受惊吓而飞走。' }
    ],
    translation: [
      '远看高山，色彩依然明艳；走近听流水，却没有声音。',
      '春天过去了，花朵依然开放；人走过来，鸟儿却不会受惊飞走。'
    ],
    appreciation: '这是一首绝妙的谜语诗。诗人通过反常的现象描绘画作，浅显易懂，妙趣横生。',
    tags: ['谜语', '画作', '自然', '写景']
  },
  {
    id: 'p-1-4',
    title: '悯农（其二）',
    author: '李绅',
    dynasty: '唐代',
    stage: 'primary',
    grade: '一年级上册',
    category: 'poetry',
    rhythm: '五言绝句',
    pinyinTitle: 'mǐn nóng',
    content: [
      '锄禾日当午，',
      '汗滴禾下土。',
      '谁知盘中餐，',
      '粒粒皆辛苦。'
    ],
    pinyinContent: [
      'chú hé rì dāng wǔ,',
      'hàn dī hé xià tǔ.',
      'shéi zhī pán zhōng cān,',
      'lì lì jiē xīn kǔ.'
    ],
    notes: [
      { word: '锄禾', meaning: '给禾苗松土除草。' },
      { word: '皆', meaning: '全，都是。' }
    ],
    translation: [
      '农民在正午烈日下锄禾，汗水滴落在禾苗下的土里。',
      '有谁知道碗里的每一粒米饭，都是农民历经辛苦耕种出来的呢。'
    ],
    appreciation: '警示人们珍惜粮食，尊重劳动者的辛苦，是家喻户晓的劝诫名篇。',
    tags: ['劳动', '珍惜粮食', '劝学']
  },
  {
    id: 'p-1-5',
    title: '古朗月行（节选）',
    author: '李白',
    dynasty: '唐代',
    stage: 'primary',
    grade: '一年级上册',
    category: 'poetry',
    rhythm: '五言古诗',
    pinyinTitle: 'gǔ lǎng yuè xíng',
    content: [
      '小时不识月，',
      '呼作白玉盘。',
      '又疑瑶台镜，',
      '飞在青云端。'
    ],
    pinyinContent: [
      'xiǎo shí bù shí yuè,',
      'hū zuò bái yù pán.',
      'yòu yí yáo tái jìng,',
      'fēi zài qīng yún duān.'
    ],
    notes: [
      { word: '呼', meaning: '叫作，称呼。' },
      { word: '瑶台', meaning: '神仙居住的地方。' }
    ],
    translation: [
      '小时候不认识月亮，把它叫作白玉盘。',
      '又怀疑是神仙瑶台上的明镜，飞到了青翠的云端。'
    ],
    appreciation: '以天真烂漫的童心想象月亮，用白玉盘与瑶台镜比喻，新奇活泼。',
    tags: ['月亮', '儿童', '想象', '写景']
  },
  {
    id: 'p-1-6',
    title: '风',
    author: '李峤',
    dynasty: '唐代',
    stage: 'primary',
    grade: '一年级上册',
    category: 'poetry',
    rhythm: '五言绝句',
    pinyinTitle: 'fēng',
    content: [
      '解落三秋叶，',
      '能开二月花。',
      '过江千尺浪，',
      '入竹万竿斜。'
    ],
    pinyinContent: [
      'jiě luò sān qiū yè,',
      'néng kāi èr yuè huā.',
      'guò jiāng qiān chǐ làng,',
      'rù zhú wàn gān xiá.'
    ],
    notes: [
      { word: '解落', meaning: '吹落。' },
      { word: '三秋', meaning: '深秋。' }
    ],
    translation: [
      '风能吹落深秋的树叶，能吹开二月的鲜花。',
      '刮过江面能掀起千尺巨浪，吹进竹林能使万竿翠竹倾斜。'
    ],
    appreciation: '全诗无一个“风”字，却通过风吹落叶、吹开花朵、掀起波浪、吹斜翠竹形象写出了风的神力。',
    tags: ['风', '自然', '谜语', '写景']
  },

  // --- 一年级下册 ---
  {
    id: 'p-1-7',
    title: '春晓',
    author: '孟浩然',
    dynasty: '唐代',
    stage: 'primary',
    grade: '一年级下册',
    category: 'poetry',
    rhythm: '五言绝句',
    pinyinTitle: 'chūn xiǎo',
    content: [
      '春眠不觉晓，',
      '处处闻啼鸟。',
      '夜来风雨声，',
      '花落知多少。'
    ],
    pinyinContent: [
      'chūn mián bù jué xiǎo,',
      'chù chù wén tí niǎo.',
      'yè lái fēng yǔ shēng,',
      'huā luò zhī duō shǎo.'
    ],
    notes: [
      { word: '晓', meaning: '天亮。' },
      { word: '闻', meaning: '听到。' }
    ],
    translation: [
      '春天睡眠香甜不知天亮，到处听到鸟儿欢快啼叫。',
      '回想昨夜的风雨声，不知道吹落了多少花朵。'
    ],
    appreciation: '描绘春天早晨鸟语花香、充满生机的勃勃景象，充满惜春爱春之情。',
    tags: ['春天', '写景', '自然']
  },
  {
    id: 'p-1-8',
    title: '赠汪伦',
    author: '李白',
    dynasty: '唐代',
    stage: 'primary',
    grade: '一年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'zèng wāng lún',
    content: [
      '李白乘舟将欲行，',
      '忽闻岸上踏歌声。',
      '桃花潭水深千尺，',
      '不及汪伦送我情。'
    ],
    pinyinContent: [
      'lǐ bái chéng zhōu jiāng yù xíng,',
      'hū wén àn shàng tà gē shēng.',
      'táo huā tán shuǐ shēn qiān chǐ,',
      'bù jí wāng lún sòng wǒ qíng.'
    ],
    notes: [
      { word: '踏歌', meaning: '民间一边唱歌一边用脚打节拍的送别形式。' },
      { word: '不及', meaning: '比不上。' }
    ],
    translation: [
      '李白坐上小船正准备出发，忽然听到岸上传来踏歌送别的声音。',
      '桃花潭的水即使有千尺深，也比不上汪伦送我的真挚情谊。'
    ],
    appreciation: '用桃花潭水之深比喻友人情谊之深，朴素自然，深情厚谊溢于言表。',
    tags: ['友情', '送别', '夸张', '名篇']
  },
  {
    id: 'p-1-9',
    title: '静夜思',
    author: '李白',
    dynasty: '唐代',
    stage: 'primary',
    grade: '一年级下册',
    category: 'poetry',
    rhythm: '五言古诗',
    pinyinTitle: 'jìng yè sī',
    content: [
      '床前明月光，',
      '疑是地上霜。',
      '举头望明月，',
      '低头思故乡。'
    ],
    pinyinContent: [
      'chuáng qián míng yuè guāng,',
      'yí shì dì shàng shuāng.',
      'jǔ tóu wàng míng yuè,',
      'dī tóu sī gù xiāng.'
    ],
    notes: [
      { word: '疑', meaning: '怀疑，以为。' },
      { word: '举头', meaning: '抬头。' }
    ],
    translation: [
      '明亮的月光照在床前，好像地上铺了一层冰冷的白霜。',
      '抬头看着天空中的明月，低头深深思念远方的故乡。'
    ],
    appreciation: '借月抒发游子深切的思乡之情，朴素自然，千古传诵。',
    tags: ['思乡', '月亮', '名篇', '情感']
  },
  {
    id: 'p-1-10',
    title: '寻隐者不遇',
    author: '贾岛',
    dynasty: '唐代',
    stage: 'primary',
    grade: '一年级下册',
    category: 'poetry',
    rhythm: '五言绝句',
    pinyinTitle: 'xún yǐn zhě bù yù',
    content: [
      '松下问童子，',
      '言师采药去。',
      '只在此山中，',
      '云深不知处。'
    ],
    pinyinContent: [
      'sōng xià wèn tóng zǐ,',
      'yán shī cǎi yào qù.',
      'zhǐ zài cǐ shān zhōng,',
      'yún shēn bù zhī chù.'
    ],
    notes: [
      { word: '言', meaning: '说。' },
      { word: '云深', meaning: '云雾弥漫山林深处。' }
    ],
    translation: [
      '在松树下询问小童子，他说师父去采药了。',
      '只知道他就在这座山里，但云雾太深不知在什么地方。'
    ],
    appreciation: '通过问答形式展现寻访隐者的曲折过程，意境幽深超俗。',
    tags: ['寻访', '自然', '高洁']
  },
  {
    id: 'p-1-11',
    title: '池上',
    author: '白居易',
    dynasty: '唐代',
    stage: 'primary',
    grade: '一年级下册',
    category: 'poetry',
    rhythm: '五言绝句',
    pinyinTitle: 'chí shàng',
    content: [
      '小娃撑小艇，',
      '偷采白莲回。',
      '不解藏踪迹，',
      '浮萍一道开。'
    ],
    pinyinContent: [
      'xiǎo wá chēng xiǎo tǐng,',
      'tōu cǎi bái lián huí.',
      'bù jiě cáng zōng jì,',
      'fú píng yī dào kāi.'
    ],
    notes: [
      { word: '不解', meaning: '不懂得。' },
      { word: '浮萍', meaning: '水生植物。' }
    ],
    translation: [
      '小孩划着小船，偷偷采摘了白莲花回来。',
      '他不懂得隐藏自己的踪迹，水面上的浮萍被划开了一道痕迹。'
    ],
    appreciation: '刻画了一个天真活泼、憨态可掬的小孩形象，语言简练鲜活。',
    tags: ['儿童', '天真', '写景', '水乡']
  },
  {
    id: 'p-1-12',
    title: '小池',
    author: '杨万里',
    dynasty: '宋代',
    stage: 'primary',
    grade: '一年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'xiǎo chí',
    content: [
      '泉眼无声惜细流，',
      '树阴照水爱晴柔。',
      '小荷才露尖尖角，',
      '早有蜻蜓立上头。'
    ],
    pinyinContent: [
      'quán yǎn wú shēng xī xì liú,',
      'shù yīn zhào shuǐ ài qíng róu.',
      'xiǎo hé cái lù jiān jiān jiǎo,',
      'zǎo yǒu qīng tíng lì shàng tóu.'
    ],
    notes: [
      { word: '晴柔', meaning: '晴天柔和的风光。' },
      { word: '尖尖角', meaning: '初生的荷叶尖角。' }
    ],
    translation: [
      '泉眼无声无息地流出细水，树阴映照在水面上喜爱这晴朗柔和的光景。',
      '嫩绿的小荷叶刚冒出尖尖的角，早就有一只蜻蜓立在了它的上头。'
    ],
    appreciation: '对初夏小池景色的生动捕捉，极其细腻传神，充满生活情趣。',
    tags: ['夏日', '荷花', '蜻蜓', '自然']
  },

  // --- 二年级上册 ---
  {
    id: 'p-2-1',
    title: '登鹳雀楼',
    author: '王之涣',
    dynasty: '唐代',
    stage: 'primary',
    grade: '二年级上册',
    category: 'poetry',
    rhythm: '五言绝句',
    pinyinTitle: 'dēng guàn què lóu',
    content: [
      '白日依山尽，',
      '黄河入海流。',
      '欲穷千里目，',
      '更上一层楼。'
    ],
    pinyinContent: [
      'bái rì yī shān jìn,',
      'huáng hé rù hǎi liú.',
      'yù qióng qiān lǐ mù,',
      'gèng shàng yī céng lóu.'
    ],
    notes: [
      { word: '依', meaning: '依傍、沿着。' },
      { word: '穷', meaning: '看尽，达到尽头。' }
    ],
    translation: [
      '夕阳依傍着群山渐渐沉没，黄河向着大海奔流而去。',
      '要想看到更辽阔的千里风光，就需要再登上一层高楼。'
    ],
    appreciation: '前两句写景宏伟壮阔，后两句融哲理于景，“更上一层楼”激励人们不断进取。',
    tags: ['哲理', '壮丽', '名胜', '励志']
  },
  {
    id: 'p-2-2',
    title: '望庐山瀑布',
    author: '李白',
    dynasty: '唐代',
    stage: 'primary',
    grade: '二年级上册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'wàng lú shān pù bù',
    content: [
      '日照香炉生紫烟，',
      '遥看瀑布挂前川。',
      '飞流直下三千尺，',
      '疑是银河落九天。'
    ],
    pinyinContent: [
      'rì zhào xiāng lú shēng zǐ yān,',
      'yáo kàn pù bù guà qián chuān.',
      'fēi liú zhí xià sān qiān chǐ,',
      'yí shì yín hé luò jiǔ tiān.'
    ],
    notes: [
      { word: '香炉', meaning: '指香炉峰。' },
      { word: '九天', meaning: '天的高处。' }
    ],
    translation: [
      '阳光照耀香炉峰升起紫色云烟，遥望瀑布像一条悬挂在山前的长河。',
      '飞流直下足有三千尺，让人怀疑是银河从九天之上落入人间。'
    ],
    appreciation: '浪漫主义奇特夸张，赋予瀑布神话般的壮美色彩，气势恢宏。',
    tags: ['瀑布', '名胜', '夸张', '写景']
  },
  {
    id: 'p-2-3',
    title: '夜宿山寺',
    author: '李白',
    dynasty: '唐代',
    stage: 'primary',
    grade: '二年级上册',
    category: 'poetry',
    rhythm: '五言绝句',
    pinyinTitle: 'yè sù shān sì',
    content: [
      '危楼高百尺，',
      '手可摘星辰。',
      '不敢高声语，',
      '恐惊天上人。'
    ],
    pinyinContent: [
      'wēi lóu gāo bǎi chǐ,',
      'shǒu kě zhāi xīng chén.',
      'bù gǎn gāo shēng yǔ,',
      'kǒng jīng tiān shàng rén.'
    ],
    notes: [
      { word: '危楼', meaning: '高楼。' },
      { word: '恐', meaning: '害怕，担心。' }
    ],
    translation: [
      '山上寺院的高楼有百尺之高，伸手就能摘下天上的星星。',
      '我不敢在大声说话，害怕惊动了天上的神仙。'
    ],
    appreciation: '运用极其夸张的想象描写山寺之高，新奇有趣，令人叹服。',
    tags: ['夸张', '星空', '建筑', '想象']
  },
  {
    id: 'p-2-4',
    title: '敕勒歌',
    author: '北朝民歌',
    dynasty: '北朝',
    stage: 'primary',
    grade: '二年级上册',
    category: 'poetry',
    rhythm: '北朝乐府民歌',
    pinyinTitle: 'chì lè gē',
    content: [
      '敕勒川，阴山下。',
      '天似穹庐，笼盖四野。',
      '天苍苍，野茫茫，',
      '风吹草低见牛羊。'
    ],
    pinyinContent: [
      'chì lè chuān, yīn shān xià.',
      'tiān sì qióng lú, lǒng gài sì yě.',
      'tiān cāng cāng, yě máng máng,',
      'fēng chuī cǎo dī xiàn niú yáng.'
    ],
    notes: [
      { word: '穹庐', meaning: '游牧民族住的圆顶毡帐。' },
      { word: '见', meaning: '同“现”，露出来。' }
    ],
    translation: [
      '敕勒平原就在阴山脚下。天空像高大的毡帐，笼罩着辽阔的大地。',
      '天色苍苍，草原茫茫，风儿吹过草丛低倒，露出了群群牛羊。'
    ],
    appreciation: '描绘北方大草原辽阔壮丽的自然风光，语言质朴豪迈，境界开阔。',
    tags: ['草原', '壮丽', '写景', '民歌']
  },

  // --- 二年级下册 ---
  {
    id: 'p-2-5',
    title: '村居',
    author: '高鼎',
    dynasty: '清代',
    stage: 'primary',
    grade: '二年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'cūn jū',
    content: [
      '草长莺飞二月天，',
      '拂堤杨柳醉春烟。',
      '儿童散学归来早，',
      '忙趁东风放纸鸢。'
    ],
    pinyinContent: [
      'cǎo zhǎng yīng fēi èr yuè tiān,',
      'fú dī yáng liǔ zuì chūn yān.',
      'ér tóng sàn xué guī lái zǎo,',
      'máng chèn dōng fēng fàng zhǐ yuān.'
    ],
    notes: [
      { word: '拂', meaning: '轻轻擦过。' },
      { word: '纸鸢', meaning: '风筝。' }
    ],
    translation: [
      '农历二月小草萌芽黄莺飞翔，杨柳拂着堤岸醉卧在春烟迷蒙中。',
      '孩子们放学早早回到家，赶忙趁着东风放起风筝。'
    ],
    appreciation: '把江南二月乡村的生机与儿童放风筝的欢快结合在一起，意境优美充满生活气息。',
    tags: ['春天', '儿童', '风筝', '乡村']
  },
  {
    id: 'p-2-6',
    title: '咏柳',
    author: '贺知章',
    dynasty: '唐代',
    stage: 'primary',
    grade: '二年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'yǒng liǔ',
    content: [
      '碧玉妆成一树高，',
      '万条垂下绿丝绦。',
      '不知细叶谁裁出，',
      '二月春风似剪刀。'
    ],
    pinyinContent: [
      'bì yù zhuāng chéng yī shù gāo,',
      'wàn tiáo chuí xià lǜ sī tāo.',
      'bù zhī xì yè shéi cái chū,',
      'èr yuè chūn fēng sì jiǎn dāo.'
    ],
    notes: [
      { word: '碧玉', meaning: '绿色的玉石。' },
      { word: '丝绦', meaning: '丝带。' }
    ],
    translation: [
      '高高的柳树像用碧玉装扮起来一样，垂挂下万千条绿色的丝带。',
      '不知道这纤细的柳叶是谁裁剪出来的，原来二月的春风就像一把灵巧的剪刀啊。'
    ],
    appreciation: '将春风巧妙比作剪刀，赞美春天的生机勃勃与神奇伟大。',
    tags: ['柳树', '春天', '比喻', '植物']
  },
  {
    id: 'p-2-7',
    title: '晓出净慈寺送林子方',
    author: '杨万里',
    dynasty: '宋代',
    stage: 'primary',
    grade: '二年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'xiǎo chū jìng cí sì sòng lín zǐ fāng',
    content: [
      '毕竟西湖六月中，',
      '风光不与四时同。',
      '接天莲叶无穷碧，',
      '映日荷花别样红。'
    ],
    pinyinContent: [
      'bì jìng xī hú liù yuè zhōng,',
      'fēng guāng bù yǔ sì shí tóng.',
      'jiē tiān lián yè wú qióng bì,',
      'yìng rì hé huā bié yàng hóng.'
    ],
    notes: [
      { word: '四时', meaning: '春夏秋冬四季。' },
      { word: '映日', meaning: '在太阳照射下。' }
    ],
    translation: [
      '到底是六月里的西湖风光，景致和其他季节完全不同。',
      '绿色的莲叶无边无际连接天际，太阳下的荷花分外鲜艳红润。'
    ],
    appreciation: '“接天莲叶无穷碧，映日荷花别样红”把六月西湖荷花盛开的美景描绘得酣畅淋漓。',
    tags: ['西湖', '荷花', '夏日', '写景']
  },
  {
    id: 'p-2-8',
    title: '绝句（两个黄鹂鸣翠柳）',
    author: '杜甫',
    dynasty: '唐代',
    stage: 'primary',
    grade: '二年级下册',
    category: 'poetry',
    rhythm: '七言绝句',
    pinyinTitle: 'jué jù',
    content: [
      '两个黄鹂鸣翠柳，',
      '一行白鹭上青天。',
      '窗含西岭千秋雪，',
      '门泊东吴万里船。'
    ],
    pinyinContent: [
      'liǎng gè huáng lí míng cuì liǔ,',
      'yī háng bái lù shàng qīng tiān.',
      'chuāng hán xī lǐng qiān qiū xuě,',
      'mén bó dōng wú wàn lǐ chuán.'
    ],
    notes: [
      { word: '含', meaning: '包含，好像框在窗框里。' },
      { word: '泊', meaning: '停泊。' }
    ],
    translation: [
      '两只黄鹂在翠绿的柳树间欢唱，一行白鹭飞上了蔚蓝的天空。',
      '窗口正对着西岭千年积雪的山峰，门前停泊着来自万里之外东吴的船只。'
    ],
    appreciation: '色彩明快，对仗极其工整，展示了安史之乱平定后诗人开阔喜悦的心境。',
    tags: ['写景', '色彩', '春天', '名篇']
  }
];
