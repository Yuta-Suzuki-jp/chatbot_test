import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, ChevronRight, ExternalLink } from 'lucide-react';

// 先生のタナカのSVG/画像アイコンコンポーネント
const TanakaAvatar = ({ size = 24 }) => (
  <img
    src="tanaka_avatar_new.png"
    alt="先生のタナカ"
    style={{ width: size, height: size, objectFit: 'cover' }}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = 'https://via.placeholder.com/150/E2E8F0/1A202C?text=Tanaka';
    }}
  />
);

// 各ユースケースのデータを定義
const useCases = {
  suntory: {
    id: 'suntory',
    label: 'Case.1: 消費財系企業',
    themeColor: 'from-blue-600 to-indigo-700',
    buttonColor: 'bg-blue-600',
    buttonHoverColor: 'hover:bg-blue-700',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    bgHoverColor: 'hover:bg-blue-50',
    headerColor: 'bg-[#005bac]',
    mediaName: 'BizToday',
    mediaCategory: 'ビジネス・IT',
    articleDate: '2022/03/17 11:00',
    articleTitle: '消費財系企業、大人の男性向けスキンケアを発売 - 10日間体験で顔印象が変わる',
    articleContent: [
      '消費財系企業は、40代以上の大人の男性に向けたオールインワンスキンケア商品を発売した。長年の研究に基づき、男性特有の肌の悩みにアプローチする。',
      '多くのミドルシニア男性はスキンケアの習慣がないが、実は男性の肌は女性に比べて水分量が少なく、皮脂量が多いため、乾燥やテカリなどのトラブルが起きやすい状態にあるという。',
      '同社が独自に開発した高浸透型エマルジョン技術により、化粧水、美容液、乳液の役割を1本で果たす。希少な天然素材から抽出したエキスなども配合されている。',
      'オンライン会議の普及などにより、自分自身の「顔」を見る機会が増えた現在、ビジネスパーソンにとって「清潔感」や「若々しい印象」は重要な武器となる。同製品はそんな大人の男性の自己投資をサポートする狙いだ。'
    ],
    agentName: '先生のタナカ',
    agentTitle: '消費財系企業 公式AIエージェント',
    scenarios: {
      step1: {
        text: 'ビジネスパーソンの「印象」について、今一番気になるテーマを選んでみてください。',
        options: [
          { text: '初対面の印象。相手はあなたの顔の『ある部分』でバイタリティを測っている？', next: 'step2' },
          { text: '奥さんの化粧水をこっそり借りている男性必見！実はそれ、『逆効果』かもしれないって知ってましたか？', next: 'step2' },
          { text: '役員面接で、面接官が履歴書以上に『無意識に』ジャッジしているポイントとは？', next: 'step2' }
        ]
      },
      step2: {
        text: '実は、ビジネスの商談やオンライン会議において、相手は無意識にあなたの『顔の明るさや潤い（清潔感）』で、仕事のパフォーマンスやバイタリティを判断していると言われています。ご自身の顔の印象で、最近気になることはありますか？',
        options: [
          { text: '夕方になると、顔が疲れてどんよりして見える', next: 'step3' },
          { text: 'オンライン会議の画面だと、実年齢より老けて見える', next: 'step3' },
          { text: '特に気にしていない', next: 'step3' }
        ]
      },
      step3: {
        text: 'その悩み、分かります…！パソコン作業が続くと、どうしても疲れた印象を与えてしまいますよね。\n実はその『疲れ顔』、単なる疲労だけでなく『肌の乾燥』が大きく影響しているんです。\n例えば、男性の肌の水分量は、女性の肌と比べてどのくらいか知っていますか？',
        options: [
          { text: '女性と同じくらい', next: 'step4' },
          { text: '女性の半分以下', next: 'step4' },
          { text: '女性より多い', next: 'step4' }
        ]
      },
      step4: {
        text: '大正解です！実は男性の肌は水分量が少なく、逆に皮脂量は多いんです。そのため、潤い不足をアブラで補おうとして『テカリ』や『どんよりした疲れ顔』に繋がってしまいます。\nだからこそ、皮脂が多い男性の肌にも合う『オールインワンケア』が、単なる美容目的ではなく、ビジネスの信頼感やバイタリティを表す『ビジネスツール』として注目されているんですよ。\nもし、毎日たった10秒でその『疲れ顔』の印象をパッと明るく変えられるとしたら、試してみたいと思いませんか？',
        options: [
          { text: 'どんなものか詳しく知りたい', next: 'step5' },
          { text: '手軽なら試してみたい', next: 'step5' }
        ]
      },
      step5: {
        text: 'ありがとうございます！消費財系企業が開発したこのスキンケア製品は、化粧水・美容液・乳液が1本にまとまったオールインワン。\n面倒なステップは一切なく、サッと塗るだけで清潔感と若々しい印象をキープできます。\n現在、ご自身の肌で実感していただける『○○キャンペーン』を実施中です。\nビジネスの新しい武器として、まずは一度詳細をチェックしてみませんか？',
        isFinal: true,
        finalActionText: '特集ページに行く',
        finalActionUrl: '#',
        finalActionAlert: 'スキンケアお試しキャンペーンページへ遷移します。',
        finalActionBtnColor: 'bg-orange-500 hover:bg-orange-600'
      }
    }
  },
  persol: {
    id: 'persol',
    label: 'Case.2: 人材系企業',
    themeColor: 'from-teal-600 to-emerald-700',
    buttonColor: 'bg-teal-600',
    buttonHoverColor: 'hover:bg-teal-700',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200',
    bgHoverColor: 'hover:bg-teal-50',
    headerColor: 'bg-[#007b8a]',
    mediaName: 'キャリアナビ',
    mediaCategory: 'キャリア・働き方',
    articleDate: '2023/10/05 09:30',
    articleTitle: 'プロ人材として働くという選択肢。あなたのスキルは社外でどれくらい通用する？',
    articleContent: [
      '近年、ひとつの会社に留まらず、自身の専門スキルを活かして複数の企業で活躍する「プロ人材（フリーランス・副業）」という働き方が注目を集めている。',
      '特にITエンジニア、マーケター、新規事業開発などの領域では、企業側の外部人材活用ニーズも急増しており、ハイクラスな案件も多数存在する。',
      'しかしながら、長年同じ環境で働いていると、自社に最適化してしまい、自身の本当の「市場価値」に気づいていないビジネスパーソンも少なくないという。',
      '本記事では、プロ人材向けサービスを通じて見えてきた、独立や副業を成功させるために必要なステップと、適正な報酬を得るためのポイントについて解説する。'
    ],
    agentName: '先生のタナカ',
    agentTitle: '人材系企業 公式キャリアアドバイザー',
    scenarios: {
      step1: {
        text: 'プロ人材の『キャリアや働き方』について、今一番気になるテーマを選んでみてください。',
        options: [
          { text: '会社員が副業を始めるとき、最初にぶつかる「意外な壁」とは？', next: 'step2' },
          { text: 'あなたの今のスキル、実は「社外（フリーランス市場）」に出すと時給いくらになる？', next: 'step2' },
          { text: '「週3日稼働」で会社員時代と同じ収入を得る人たちの共通点とは？', next: 'step2' }
        ]
      },
      step2: {
        text: '『自分の本当の市場価値（時給）』、気になりますよね。\n長年同じ会社にいると、社内の評価基準に縛られて、自分のスキルの『外での価値』を見失いがちです。ご自身のスキルや経験の『社外での評価』について、どう感じていますか？',
        options: [
          { text: '正直、外でどれくらい通用するか（いくら稼げるか）分からない', next: 'step3' },
          { text: '今の会社の給与より、フリーランス市場の方が高いのでは？と期待している', next: 'step3' },
          { text: '特に気にしていない', next: 'step3' }
        ]
      },
      step3: {
        text: 'そのお気持ち、よく分かります…！\n自社に最適化して働いていると、なかなかご自身の客観的な価値に気づけないですよね。\n実は、皆さんがお持ちの専門スキルは、外の市場に出すと想像以上の単価になることがよくあります。\nDX推進やマーケティングなどの専門スキルを持つプロ人材の『平均的な時給相場』って、いくらくらいだと思いますか？',
        options: [
          { text: '時給 3,000円〜5,000円くらい', next: 'step4' },
          { text: '時給 5,000円〜10,000円くらい', next: 'step4' },
          { text: '時給 10,000円以上', next: 'step4' }
        ]
      },
      step4: {
        text: '大正解です！専門スキルを持つプロ人材の市場価値は今非常に高く、\n時給換算で5,000円〜10,000円以上になるハイクラス案件が急増しています。\nだからこそ、自分のスキルを安売りせず、適正に高く評価してくれる環境を選ぶことが重要です。\n人材系企業のプロ人材サービスには、あなたが持つ専門スキルを高く評価する『高単価・ハイクラス案件』が豊富に揃っているんですよ。\nご自身のスキルでどんな案件があるか、まずは少し覗いてみませんか？',
        options: [
          { text: '自分のスキルでどんな案件があるか見てみたい', next: 'step5' },
          { text: 'まずは情報収集だけしてみたい', next: 'step5' }
        ]
      },
      step5: {
        text: 'ありがとうございます！人材系企業のプロ人材サービスでは、あなたの専門スキルを活かして、月数十万円の報酬を得られるような優良案件を多数扱っています。\n無料会員登録をしていただくと、非公開のハイクラス案件もご覧いただけますし、エージェントがあなたの『適正単価』も客観的に診断いたします。\nまずはご自身の『本当の市場価値』を確かめるためにも、こちらから登録してみませんか？',
        isFinal: true,
        finalActionText: '無料会員登録して案件を見る',
        finalActionUrl: '#',
        finalActionAlert: 'プロ人材サービス無料会員登録ページへ遷移します。',
        finalActionBtnColor: 'bg-teal-600 hover:bg-teal-700'
      }
    }
  },
  honda: {
    id: 'honda',
    label: 'Case.3: 自動車系企業',
    themeColor: 'from-red-600 to-red-800',
    buttonColor: 'bg-red-600',
    buttonHoverColor: 'hover:bg-red-700',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    bgHoverColor: 'hover:bg-red-50',
    headerColor: 'bg-[#cc0000]',
    mediaName: 'モビリティプレス',
    mediaCategory: '先進モビリティ',
    articleDate: '2024/01/20 10:00',
    articleTitle: 'クルマとスマホが繋がる時代。コネクテッドサービスがもたらす新しいカーライフの形',
    articleContent: [
      '自動車のコネクテッド化が急速に進む中、自動車系企業が提供する新世代コネクテッドサービスがドライバーの日々の体験を大きく変えようとしている。',
      '専用スマートフォンアプリを通じて、離れた場所からのエアコン操作や、ドアロックの確認・操作が可能に。寒い冬や暑い夏に、乗車前から快適な車内空間を準備できるのは大きなメリットだ。',
      'また、広大な駐車場で愛車の位置が分からなくなった場合でも、地図上で正確な現在地を確認できる「クルマを探す」機能など、日常のちょっとしたストレスを解消する機能が充実している。',
      'さらに、万が一の事故の際には自動で緊急通報を行い、オペレーターが迅速にサポートを手配する安心の機能も備わっており、単なる利便性だけでなく、ユーザーに安心と安全を提供するプラットフォームとなっている。'
    ],
    agentName: '先生のタナカ',
    agentTitle: '自動車系企業 デジタルサポートデスク',
    scenarios: {
      step1: {
        text: 'ドライブ中の『あるあるな悩み』について、いま一番気になるテーマを選んでみてください。',
        options: [
          { text: '寒い冬の朝、震えながら車のエンジンが暖まるのを待っていませんか？', next: 'step2' },
          { text: '「そろそろオイル交換かな？」愛車の状態、正確に把握できていますか？', next: 'step2' },
          { text: 'ショッピングモールの広い駐車場で「あれ？車どこに停めたっけ？」と迷子になった時の解決策とは？', next: 'step2' }
        ]
      },
      step2: {
        text: '広い駐車場での『車迷子』、焦りますよね…！\n大型のアウトレットモールや、初めて行く旅行先などで、ご自身の車を見失ってしまった時、普段はどうやって探していますか？',
        options: [
          { text: 'とにかく自力で歩き回って探す', next: 'step3' },
          { text: 'スマートキーのボタンを押して音（ハザード）で探す', next: 'step3' },
          { text: '停めた場所の周りの風景や柱の番号をスマホで撮影しておく', next: 'step3' }
        ]
      },
      step3: {
        text: '自力で歩き回るの、疲れて帰る前だと本当にしんどいですよね（笑）。\n柱の番号をメモしたりするのも、毎回となると意外と面倒だと思います。\n最近はスマートフォンとクルマが繋がる技術が進化していますが、スマホの地図アプリ上でご自身の愛車が『ピンポイントでどこに停まっているか』まで分かるって、知っていましたか？',
        options: [
          { text: 'え！そこまで分かるの？（知らなかった）', next: 'step4' },
          { text: '何となく聞いたことはあるかも', next: 'step4' },
          { text: '自分には設定が難しそう…', next: 'step4' }
        ]
      },
      step4: {
        text: '実は、今のクルマはそこまで進化しているんです！\n自動車系企業の公式カーライフアプリを使えば、『クルマを探す』機能で現在地から愛車までのルートをスマホの地図上で正確に案内してくれます。\nさらに、見知らぬ土地でのドライブ中に万が一トラブルが起きても、アプリからサポートセンターへボタン一つで繋がり、圧倒的な安心感が得られるんです。\n日々のドライブの不安やストレスを無くしてくれるこのアプリ、ご自身のスマホに入れておきたいと思いませんか？',
        options: [
          { text: 'どんなことができるのか、もっと詳しく知りたい', next: 'step5' },
          { text: '便利そう！無料で使えるなら入れてみたい', next: 'step5' }
        ]
      },
      step5: {
        text: 'ありがとうございます！自動車系企業の公式カーライフアプリは、オーナー様なら無料でご利用いただける公式アプリです。\n駐車場での迷子防止だけでなく、ドライブの記録を残せたり、デジタル説明書として使えたりと、カーライフを劇的に快適にする機能が詰まっています。\n万が一のトラブルへの『お守り』としても、次回のお出かけ前にぜひダウンロードしておきませんか？',
        isFinal: true,
        finalActionText: '無料アプリをダウンロードして機能を見る',
        finalActionUrl: '#',
        finalActionAlert: '公式カーライフアプリのダウンロードページ（App Store / Google Play 等）へ遷移します。',
        finalActionBtnColor: 'bg-red-600 hover:bg-red-700'
      }
    }
  },
  tepco: {
    id: 'tepco',
    label: 'Case.4: エネルギー系企業',
    themeColor: 'from-yellow-500 to-orange-600',
    buttonColor: 'bg-yellow-500',
    buttonHoverColor: 'hover:bg-yellow-600',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    bgHoverColor: 'hover:bg-yellow-50',
    headerColor: 'bg-[#e8590c]',
    mediaName: 'スマートライフ',
    mediaCategory: '生活・ライフスタイル',
    articleDate: '2024/06/10 08:00',
    articleTitle: '電気代がまた値上げ…今すぐできる節約術と、プロが教える"抜本的な対策"とは？',
    articleContent: [
      '2024年も続く電気料金の値上がり。家計への影響は大きく、多くの家庭でエアコンの設定温度を見直したり、こまめに電気を消すなどの節電対策に取り組んでいる。',
      'しかし、日々の節電努力だけでは限界があるのも事実だ。「我慢の節約」はストレスが溜まり、長続きしないという声も多い。',
      'そこで今、戸建て住宅を中心に急速に普及しているのが、太陽光発電と蓄電池の導入だ。自宅の屋根で電気を作り、余った電力を蓄えておくことで、電力会社から買う電気の量を大幅に減らすことができる。',
      '本記事では、初期費用をかけずに太陽光パネルや蓄電池を導入できる新しいサービスの仕組みと、実際にどれくらい電気代が変わるのかを専門家が解説する。'
    ],
    agentName: '先生のタナカ',
    agentTitle: 'エネルギー系企業 公式アドバイザー',
    scenarios: {
      step1: {
        text: 'おうちの『電気・暮らし』について、いま一番気になるテーマを選んでみてください。',
        options: [
          { text: 'みんながやってる「電気代節約術」、実は限界がある？チマチマ節約するより効果的な"ウラ技"', next: 'step2' },
          { text: '自然災害で「長期間の停電」が起きたら、一番困る家電って何だと思いますか？', next: 'step2' },
          { text: '「太陽光パネルって高そう…」戸建てオーナーの7割が誤解している、最新の導入方法とは？', next: 'step2' }
        ]
      },
      step2: {
        text: '最近の電気代高騰、本当に家計に響きますよね…。\nエアコンの温度をこまめに調整したり、使っていない家電のプラグを抜いたり。ご自宅でも、色々と節約の工夫をされていますか？',
        options: [
          { text: 'はい、かなり意識して節電を頑張っている', next: 'step3' },
          { text: '気にはしているが、正直面倒で長続きしない', next: 'step3' },
          { text: '家族が協力してくれなくて困っている', next: 'step3' }
        ]
      },
      step3: {
        text: '素晴らしいです！でも、日々の節電って常に気を張っていなきゃいけなくて、少しストレスを感じることもありませんか？\n実は、チマチマと消費電力を減らす以外に、電気代高騰に対抗する『抜本的な解決策』があるんです！\n最近、戸建てにお住まいの方で急激に増えている『電気代への一番の防衛策』って何だと思いますか？',
        options: [
          { text: '料金プランを頻繁に見直す', next: 'step4' },
          { text: '最新の省エネ家電に全て買い替える', next: 'step4' },
          { text: '太陽光パネルで『自宅で電気を作る』', next: 'step4' }
        ]
      },
      step4: {
        text: '大正解です！電気を買う量を減らすには、やはり『自宅で電気を作って使う』のが一番効果的なんです。\nでも、『太陽光パネルって、最初に何百万円もかかるんでしょ？』と思っていませんか？\n実はエネルギー系企業の初期費用0円サービスなら、なんと【初期費用0円（毎月定額）】で最新の太陽光パネルや蓄電池を設置できるんですよ。\nまとまったお金を用意しなくても、電気代の節約と、もしもの時の防災対策が同時に叶うとしたら、ご自宅に設置してみたいと思いませんか？',
        options: [
          { text: '初期費用0円なら、どれくらい安くなるか知りたい', next: 'step5' },
          { text: '自分の家の屋根にも乗るのか気になる', next: 'step5' }
        ]
      },
      step5: {
        text: 'ありがとうございます！エネルギー系企業の初期費用0円サービスなら初期費用が0円なだけでなく、契約期間中の機器の修理保証もついているので安心です。\n太陽光で作った電気を使えば、毎月の電気代がどれくらいおトクになるか、気になりますよね。\nご自宅の住所や屋根の形から、たった1分で簡単に『無料シミュレーション』ができます。\n今後の節約のヒントとして、まずは一度シミュレーションしてみませんか？',
        isFinal: true,
        finalActionText: 'プラン・料金を見てみる',
        finalActionUrl: '#',
        finalActionAlert: '初期費用0円サービスの「プラン・料金」ページへ遷移します。',
        finalActionBtnColor: 'bg-orange-500 hover:bg-orange-600'
      }
    }
  }
};

const App = () => {
  const [activeCaseKey, setActiveCaseKey] = useState('suntory');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const activeCase = useCases[activeCaseKey];

  // 初回マウント時にチャットを開く演出
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      startConversation(activeCaseKey);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // ユースケース切り替えハンドラ
  const handleCaseSwitch = (key) => {
    if (activeCaseKey === key) return;
    setActiveCaseKey(key);

    // アニメーションとリセットを実施
    setIsOpen(false);
    setMessages([]);
    setIsTyping(false);

    setTimeout(() => {
      setIsOpen(true);
      startConversation(key);
    }, 600);
  };

  const startConversation = (caseKey) => {
    const scenario = useCases[caseKey].scenarios;
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          id: Date.now(),
          sender: 'ai',
          ...scenario.step1
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOptionClick = (optionObj) => {
    // ユーザーの選択をメッセージとして追加
    const newUserMsg = { id: Date.now(), sender: 'user', text: optionObj.text };

    // 現在のメッセージの選択肢を消す
    setMessages(prev => prev.map(msg =>
      msg.options ? { ...msg, options: null } : msg
    ).concat(newUserMsg));

    setIsTyping(true);

    // 選択に応じた次のシナリオを遅延表示（AIのタイピング演出）
    setTimeout(() => {
      const nextScenarioKey = optionObj.next;
      const nextScenario = activeCase.scenarios[nextScenarioKey];
      if (nextScenario) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'ai',
          ...nextScenario
        }]);
      }
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 font-sans overflow-hidden flex flex-col items-center">

      {/* ユースケース切り替えナビゲーション（固定ヘッダーとして画面上部に設置） */}
      <div className="w-full bg-white shadow-sm z-50 flex justify-center border-b border-gray-200">
        <div className="max-w-3xl w-full p-3 flex justify-center space-x-2 md:space-x-4 overflow-x-auto">
          {Object.values(useCases).map((uc) => (
            <button
              key={uc.id}
              onClick={() => handleCaseSwitch(uc.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeCaseKey === uc.id
                ? `${uc.buttonColor} text-white shadow-md`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
                }`}
            >
              {uc.label}
            </button>
          ))}
        </div>
      </div>

      {/* 背景のダミー記事領域 */}
      <div className="w-full max-w-3xl bg-white h-full overflow-y-auto shadow-xl relative pb-32">
        <header className={`${activeCase.headerColor} text-white p-4 flex items-center justify-between sticky top-0 z-10 transition-colors duration-500`}>
          <div className="font-bold text-xl tracking-wider">{activeCase.mediaName}</div>
          <div className="text-sm">{activeCase.mediaCategory}</div>
        </header>

        <main className="p-6 md:p-10">
          <div className="text-sm text-gray-500 mb-2">{activeCase.articleDate}</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight transition-all">
            {activeCase.articleTitle}
          </h1>

          <div className="w-full h-64 bg-gray-200 mb-6 flex items-center justify-center text-gray-400 rounded-lg overflow-hidden">
            {/* ダミーのアイキャッチ画像領域 */}
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed transition-all">
            {activeCase.articleContent.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
            <div className="h-40 border-t border-gray-200 mt-8 pt-8 text-center text-gray-400">
              記事の続き... (ダミーテキスト)
            </div>
          </div>
        </main>
      </div>

      {/* Chat Jack ウィジェット */}
      <div className={`fixed bottom-0 md:bottom-6 md:right-6 w-full md:w-[400px] transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-y-0' : 'translate-y-[120%]'} z-40`}>

        {/* チャットUI本体 */}
        <div className="bg-white md:rounded-2xl shadow-2xl flex flex-col h-[600px] md:h-[650px] max-h-[85vh] border border-gray-100 overflow-hidden">

          {/* ヘッダー */}
          <div className={`bg-gradient-to-r ${activeCase.themeColor} p-4 flex justify-between items-center text-white shrink-0 shadow-md transition-colors duration-500`}>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white">
                  <TanakaAvatar size={40} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">{activeCase.agentName}</h3>
                <p className="text-xs text-white/90">{activeCase.agentTitle}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* メッセージエリア */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#f8fafc]">
            {messages.map((msg, index) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>

                {/* AIアイコン */}
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 shrink-0 mt-1 border border-gray-200 overflow-hidden">
                    <TanakaAvatar size={32} />
                  </div>
                )}

                <div className={`max-w-[80%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* メッセージバブル */}
                  <div
                    className={`p-3.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm
                      ${msg.sender === 'user'
                        ? `${activeCase.buttonColor} text-white rounded-tr-none transition-colors duration-500`
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                      }`}
                  >
                    {msg.text}
                  </div>

                  {/* 選択肢（AIの場合のみ、かつオプションが存在する場合） */}
                  {msg.options && (
                    <div className="mt-3 space-y-2 w-full pl-2">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(opt)}
                          className={`w-full text-left p-3 text-sm bg-white border ${activeCase.borderColor} ${activeCase.textColor} ${activeCase.bgHoverColor} rounded-xl transition-all shadow-sm flex justify-between items-center group`}
                        >
                          <span className="leading-snug">{opt.text}</span>
                          <ChevronRight size={16} className={`text-gray-300 group-hover:${activeCase.textColor} shrink-0 ml-2 transition-colors`} />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* 最終コンバージョンボタン */}
                  {msg.isFinal && (
                    <div className="mt-4 w-full pl-2">
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); alert(msg.finalActionAlert); }}
                        className={`w-full flex items-center justify-center space-x-2 ${msg.finalActionBtnColor || 'bg-orange-500 hover:bg-orange-600'} text-white p-4 rounded-xl font-bold shadow-md transition-colors`}
                      >
                        <span>{msg.finalActionText}</span>
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* タイピングインジケーター */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 shrink-0 border border-gray-200 overflow-hidden">
                  <TanakaAvatar size={32} />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex space-x-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* チャット入力エリア（ダミー） */}
          <div className="bg-white p-3 border-t border-gray-100 shrink-0">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 opacity-60">
              <input
                type="text"
                placeholder="選択肢からお選びください..."
                disabled
                className="bg-transparent w-full outline-none text-sm text-gray-500"
              />
              <button disabled className="text-gray-400 p-1">
                <Send size={18} />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400">Powered by Chat Jack</span>
            </div>
          </div>
        </div>
      </div>

      {/* 閉じた状態のフローティングボタン */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 w-14 h-14 ${activeCase.buttonColor} ${activeCase.buttonHoverColor} rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-105 z-50 animate-bounce`}
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
