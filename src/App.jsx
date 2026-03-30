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
    mediaName: 'Mynavi News',
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
    mediaName: 'カーセレクト',
    mediaCategory: '新車・カーライフ',
    articleDate: '2025/02/14 10:00',
    articleTitle: 'いま売れている新型EV・SUVの実力とは？ファミリーにも選ばれる理由を徹底解説',
    articleContent: [
      'SUVブームが続く国内自動車市場で、いま注目を集めているのがEV（電気自動車）やハイブリッドモデルだ。かつては「航続距離が短い」「充電が面倒」と敬遠されていたEVも、技術進化により日常使いに十分な性能を備え、ファミリー層からの支持が急拡大している。',
      '選ばれる理由のひとつが維持費の安さだ。ガソリン代が高騰する中、自宅充電を活用すれば年間の燃料コストを大幅に抑えられる。さらに自動車税の減免や補助金制度も充実しており、トータルコストで見るとガソリン車より割安になるケースも少なくない。',
      'もうひとつの大きな進化が安全装備だ。衝突被害軽減ブレーキ、車線逸脱防止支援、後方誤発進抑制など、かつては高級車にしか搭載されなかった先進安全技術が、いまや多くの新型車に標準装備されている。小さな子供を乗せるファミリーや、高齢の親に乗ってもらう車として、安全性能は最重要ポイントだ。',
      '本記事では、最新の新型EV・SUVの特徴や装備、選び方のポイントを徹底解説。「次の1台」を検討中の方は、まず各車種の特徴ページで実車の魅力をチェックしてみてほしい。'
    ],
    agentName: '先生のタナカ',
    agentTitle: '自動車系企業 公式カーアドバイザー',
    scenarios: {
      step1: {
        text: 'クルマの買い替えや新車検討について、今のあなたに近い状況を選んでみてください。',
        options: [
          { text: '家族が増えた・子供の成長で、今の車が手狭に感じてきた', next: 'step2' },
          { text: 'ガソリン代の高騰が気になる。電気自動車やハイブリッドに興味がある', next: 'step2' },
          { text: '自分や家族の安全のために、最新の安全装備が付いた車を検討したい', next: 'step2' }
        ]
      },
      step2: {
        text: 'ありがとうございます。\nちなみに、今のお車にはどのくらい乗っていますか？',
        options: [
          { text: '3年未満（まだ新しいけど気になっている）', next: 'step3' },
          { text: '5〜7年くらい（そろそろ買い替え時期かも）', next: 'step3' },
          { text: '10年以上（かなり長く乗っている）', next: 'step3' }
        ]
      },
      step3: {
        text: '買い替えを考えるタイミングですよね。\n最近はEVやハイブリッドの進化が目覚ましいですが、ガソリン車とEVで年間の燃料・電気代にどのくらいの差が出るか知っていますか？（年間1万km走行の場合）',
        options: [
          { text: '年間1〜2万円くらいの差', next: 'step4' },
          { text: '年間5〜8万円くらいの差', next: 'step4' },
          { text: '年間10万円以上の差', next: 'step4' }
        ]
      },
      step4: {
        text: '走行条件にもよりますが、年間5〜8万円ほど燃料代が安くなるケースが多いんです。5年乗れば25〜40万円の差になりますね。\nさらに最新モデルでは、衝突被害軽減ブレーキ・車線逸脱防止・駐車支援といった先進安全装備が標準搭載されており、ご家族を乗せる方にとっても大きな安心材料です。\n自動車系企業の新型EV・SUVは、広々とした室内空間とファミリーに嬉しい装備が充実しています。\n実際のデザインや装備の詳細、気になりませんか？',
        options: [
          { text: 'どんな装備・機能があるか詳しく知りたい', next: 'step5' },
          { text: 'デザインや室内空間を写真で見てみたい', next: 'step5' }
        ]
      },
      step5: {
        text: 'ありがとうございます！自動車系企業の新型EV・SUVの特徴ページでは、360°ビューで外観・内装をじっくりご覧いただけるほか、装備一覧やグレード別の比較も簡単にチェックできます。\n「この車、うちの家族に合うかも」と思える1台がきっと見つかるはずです。\nまずは気になる車種の特徴ページを覗いてみませんか？',
        isFinal: true,
        finalActionText: '車種の特徴ページを見る',
        finalActionUrl: '#',
        finalActionAlert: '自動車系企業の車種特徴・スペックページへ遷移します。',
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
    mediaName: 'ライフのアイデア',
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
  },
  bank: {
    id: 'bank',
    label: 'Case.5: 銀行系企業',
    themeColor: 'from-slate-700 to-blue-900',
    buttonColor: 'bg-slate-700',
    buttonHoverColor: 'hover:bg-slate-800',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-200',
    bgHoverColor: 'hover:bg-slate-50',
    headerColor: 'bg-[#1e3a5f]',
    mediaName: 'フリーランスナビ',
    mediaCategory: '独立・フリーランス',
    articleDate: '2024/11/08 09:00',
    articleTitle: '個人事業主・フリーランスの「お金管理」落とし穴。事業用口座を持つだけで、確定申告がラクになる理由',
    articleContent: [
      'フリーランス・個人事業主として働く人が急増する中、事業用の銀行口座を開設せず、個人口座をそのまま使い続けているケースが少なくない。売上の入金も日々の経費の支払いも、プライベートの出費と同じ口座に混在してしまっている状態だ。',
      '問題が顕在化するのは確定申告の時期だ。1年分の明細を見返しながら「これは経費か、プライベートか」を1件ずつ判断する作業は想像以上に時間を奪う。結果として税理士への依頼費用がかさんだり、申告ミスのリスクも高まる。',
      '一方、事業用口座を持つことで得られるメリットは大きい。入出金がすべて事業に関するものだけになるため、会計ソフトとの自動連携が機能し、帳簿付けの手間が激減する。また、請求書に記載する振込先が個人名義でなくなることで、取引先からの信頼感も向上する。',
      '銀行系企業の個人事業主向け口座は、マイナンバーカードさえあればスマホで最短当日開設が可能だ。主要な会計ソフトとの連携や、専任の事業主サポートダイヤルも用意されており、開業直後の不安なスタートを強力にバックアップする。'
    ],
    agentName: '先生のタナカ',
    agentTitle: '銀行系企業 個人事業主サポートデスク',
    scenarios: {
      step1: {
        text: '個人事業主・フリーランスの「お金管理」で、今一番気になるテーマを選んでみてください。',
        options: [
          { text: '確定申告のたびに「どれが経費か」で時間を溶かしていませんか？', next: 'step2' },
          { text: '取引先から「個人口座への振込は少し…」と思われているかもしれない理由', next: 'step2' },
          { text: '事業用口座を持つだけで節税につながる？知らないと損する話', next: 'step2' }
        ]
      },
      step2: {
        text: '現在、事業の入出金はどのように管理していますか？',
        options: [
          { text: '個人の銀行口座をそのまま使っている', next: 'step3' },
          { text: '事業用口座は持っているが、管理がうまくできていない', next: 'step3' },
          { text: 'これから独立・開業予定で、まだ何も準備できていない', next: 'step3' }
        ]
      },
      step3: {
        text: '個人口座と事業の入出金が混在していると、確定申告の際に「プライベートの出費」と「経費」を1件ずつ仕分けする必要があります。\n実は、この仕分け作業だけで年間どのくらいの時間を費やしている人が多いか、ご存知ですか？',
        options: [
          { text: '数時間程度（半日あれば終わる）', next: 'step4' },
          { text: '10〜20時間（丸2〜3日分）', next: 'step4' },
          { text: '30時間以上（経理の専門家に頼む人も多い）', next: 'step4' }
        ]
      },
      step4: {
        text: '実は、確定申告前に30時間以上を仕分け作業に費やしているという個人事業主も珍しくありません。\n事業用口座を1つ持つだけで、入金はすべて事業収入・出金はすべて経費と明確に分けられ、会計ソフトとの自動連携でほぼ自動で帳簿が完成します。\nさらに、請求書に「個人名義でない口座」を記載できるため、取引先からの信頼感も格段に上がるんですよ。\n銀行系企業の個人事業主向け口座なら、マイナンバーカードがあればスマホだけで最短当日に開設できます。',
        options: [
          { text: '開設の手順や必要書類を知りたい', next: 'step5' },
          { text: '会計ソフトとの連携機能を詳しく見てみたい', next: 'step5' }
        ]
      },
      step5: {
        text: 'ありがとうございます！銀行系企業の個人事業主向け口座は、マイナンバーカードがあれば最短当日・スマホだけで開設が完了します。\n口座開設後は、主要な会計ソフトとの自動連携や、専任の事業主サポートダイヤルもご利用いただけます。\nまずは口座開設だけでも済ませておくと、次の確定申告がぐっとラクになりますよ。',
        isFinal: true,
        finalActionText: '個人事業主向け口座を無料で開設する',
        finalActionUrl: '#',
        finalActionAlert: '銀行系企業の個人事業主向け口座開設ページへ遷移します。',
        finalActionBtnColor: 'bg-slate-700 hover:bg-slate-800'
      }
    }
  },
  card: {
    id: 'card',
    label: 'Case.6: カード系企業',
    themeColor: 'from-purple-700 to-violet-900',
    buttonColor: 'bg-purple-700',
    buttonHoverColor: 'hover:bg-purple-800',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    bgHoverColor: 'hover:bg-purple-50',
    headerColor: 'bg-[#4a1d96]',
    mediaName: 'マネーガイド',
    mediaCategory: 'マネー・ローン',
    articleDate: '2024/08/22 10:00',
    articleTitle: 'カードローンの賢い選び方。金利・審査・スピード、あなたに合った借り方とは？',
    articleContent: [
      'ライフスタイルの変化や物価上昇を背景に、急な出費や一時的な資金不足に備えてカードローンを検討する人が増えている。しかし、金融機関や商品によって金利・審査基準・融資スピードは大きく異なり、選び方次第で返済総額に大きな差が出る。',
      '特に注意したいのが金利だ。消費者金融系と銀行系では上限金利に差があることが多く、同じ借入額でも長期になるほど利息の差が積み重なる。現在すでに他社で借りている場合は、金利の低いカードローンへの乗り換え（借り換え）を検討する価値がある。',
      '審査のスピードも重要な選択肢のひとつだ。最短数十分で審査結果が出るサービスも登場しており、急な出費が発生した場合でも即日融資に対応するケースがある。一方で、利用限度額を高く設定したい場合や、長期利用を前提にするなら審査に多少時間がかかっても金利の低い商品を選ぶのが賢明だ。',
      '本記事では、カードローンを初めて検討する方から、現在の借り先を見直したい方まで、自分のシチュエーションに合った選び方のポイントを解説する。'
    ],
    agentName: '先生のタナカ',
    agentTitle: 'カード系企業 公式ローンアドバイザー',
    scenarios: {
      step1: {
        text: 'カードローンについて、今のあなたの状況に近いものを選んでみてください。',
        options: [
          { text: '車の修理代・急な冠婚葬祭など、予想外の出費が発生して今すぐお金が必要', next: 'step2' },
          { text: '給料日前に旅行や欲しい家電がある。賢く「今すぐ手に入れる」方法を知りたい', next: 'step2' },
          { text: 'すでに他社で借りているが、金利が高い気がする。もっと良い条件に乗り換えたい', next: 'step2' }
        ]
      },
      step2: {
        text: 'なるほど、ありがとうございます。\nカードローンを検討するうえで、あなたが一番気にしていることは何ですか？',
        options: [
          { text: 'とにかくスピード重視。今日中にお金を手にしたい', next: 'step3' },
          { text: '金利をできるだけ低く抑えたい', next: 'step3' },
          { text: '審査が不安。在籍確認や書類が少ない方がいい', next: 'step3' }
        ]
      },
      step3: {
        text: 'カードローンを選ぶ際、金利はとても重要なポイントですよね。\n例えば、50万円を金利15%で借りた場合と、金利10%で借りた場合、1年間の利息差はどのくらいになるか分かりますか？',
        options: [
          { text: '約5,000円くらい', next: 'step4' },
          { text: '約2万5,000円くらい', next: 'step4' },
          { text: '約5万円以上', next: 'step4' }
        ]
      },
      step4: {
        text: '正解は約2万5,000円です！金利が5%違うだけで、年間2万5,000円もの差になります。\n長期・高額になるほどその差はさらに広がります。だからこそ、1%でも金利が低く、信頼できるカードローンを選ぶことが重要です。\nカード系企業のカードローンは業界水準を下回る低金利に加え、最短即日融資・スマホだけで完結するWeb完結申込にも対応しています。\nまずご自身がいくら借りられるか、無料で診断してみませんか？',
        options: [
          { text: '借入可能額・金利をシミュレーションしてみたい', next: 'step5' },
          { text: 'Web完結で申し込めるか詳しく知りたい', next: 'step5' }
        ]
      },
      step5: {
        text: 'ありがとうございます！カード系企業のカードローンは、スマホだけで申込・契約が完結するWeb完結に対応。\n審査結果は最短30分でお知らせし、融資は最短即日も可能です。\n「いくら借りられるか」「月々の返済額はいくらか」を事前に確認できる無料診断も用意しています。まずはお気軽にチェックしてみてください。',
        isFinal: true,
        finalActionText: '無料で借入診断・Web申込をする',
        finalActionUrl: '#',
        finalActionAlert: 'カード系企業のカードローン申込・診断ページへ遷移します。',
        finalActionBtnColor: 'bg-purple-700 hover:bg-purple-800'
      }
    }
  },
  insurance: {
    id: 'insurance',
    label: 'Case.7: 保険系企業',
    themeColor: 'from-green-800 to-emerald-700',
    buttonColor: 'bg-green-800',
    buttonHoverColor: 'hover:bg-green-900',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    bgHoverColor: 'hover:bg-green-50',
    headerColor: 'bg-[#166534]',
    mediaName: 'くるまと暮らし',
    mediaCategory: 'カーライフ・保険',
    articleDate: '2024/10/03 09:00',
    articleTitle: '自動車保険、「なんとなく更新」していませんか？見直すだけで年間数万円トクになる人の共通点',
    articleContent: [
      '自動車保険は毎年更新するものだが、「去年と同じでいいか」と深く考えずに継続している人が大半だ。しかし、運転状況や家族構成、車の使い方が変われば、最適な補償内容も変わる。見直しをしないまま更新を繰り返すと、不要な補償に費用を払い続けたり、逆に必要な補償が足りていないリスクもある。',
      '保険料を左右する要素は多岐にわたる。年齢・免許の色・走行距離・車種・補償の組み合わせなど、条件が変われば保険料も大きく変動する。特に「ゴールド免許を取得した」「年間走行距離が減った」といったタイミングは、保険料が下がる大チャンスだ。',
      '一方で、補償の薄さが命取りになるケースも後を絶たない。対人・対物は無制限が基本だが、車両保険の有無や弁護士費用特約の付帯状況によって、事故後の実際の出費は数十万〜数百万円単位で変わることがある。',
      'ネット型の自動車保険は、代理店を介さないぶんコストを抑えており、同等の補償内容でも代理店型より保険料が安くなるケースが多い。スマホから最短3分で見積もりが取れるサービスも登場し、「手間がかかる」という理由で見直しを先送りする必要もなくなった。'
    ],
    agentName: '先生のタナカ',
    agentTitle: '保険系企業 公式保険アドバイザー',
    scenarios: {
      step1: {
        text: '自動車保険について、今のあなたの状況に一番近いものを選んでみてください。',
        options: [
          { text: '自動車保険の更新が近づいてきた。今の保険のままでいいか、なんとなく気になっている', next: 'step2' },
          { text: '毎年の保険料が高い気がする。同じ補償内容でもっと安くできないか知りたい', next: 'step2' },
          { text: 'もし事故を起こしたとき、今の補償内容で本当に十分なのか不安がある', next: 'step2' }
        ]
      },
      step2: {
        text: 'ありがとうございます。\n現在、自動車保険に年間どのくらい支払っていますか？',
        options: [
          { text: '3万円未満', next: 'step3' },
          { text: '3万〜6万円くらい', next: 'step3' },
          { text: '6万円以上（または把握していない）', next: 'step3' }
        ]
      },
      step3: {
        text: '保険料って、意外と家計に響きますよね。\n少し確認なのですが、自動車保険で「車両保険」を付けていない場合、自分の車が全損になったとき、修理費用はどこから出ると思いますか？',
        options: [
          { text: '相手の保険から全額補償してもらえる', next: 'step4' },
          { text: '自分で全額負担しなければならない', next: 'step4' },
          { text: '国や自治体が一部補助してくれる', next: 'step4' }
        ]
      },
      step4: {
        text: '正解は「自分で全額負担」です。\n相手のいない自損事故や、当て逃げ・自然災害による損害は、車両保険がないと修理費がまるごと自己負担になってしまいます。\nただし、車両保険を付けると保険料が上がるのも事実。そこで重要なのが「補償の取捨選択」と「保険会社の選び方」です。\n保険系企業のネット型自動車保険なら、補償内容を自分でカスタマイズしながら、代理店型と同等の手厚いサポートが受けられます。しかも、スマホから最短3分で保険料の見積もりが可能です。\nご自身の保険料がどのくらい変わるか、一度確かめてみませんか？',
        options: [
          { text: '今の保険料より安くなるか、見積もりを出してみたい', next: 'step5' },
          { text: '補償内容をカスタマイズできるか詳しく知りたい', next: 'step5' }
        ]
      },
      step5: {
        text: 'ありがとうございます！保険系企業の自動車保険は、今なら無料見積もりがスマホで最短3分。\n現在の保険証券がなくてもOKで、生年月日・車種・使用目的を入力するだけで、あなたに合ったプランの保険料がすぐに分かります。\n「見積もりだけ」でも大歓迎ですので、まずは現在の保険料と比べてみませんか？',
        isFinal: true,
        finalActionText: '無料で保険料を見積もる（最短3分）',
        finalActionUrl: '#',
        finalActionAlert: '保険系企業の自動車保険・無料見積もりページへ遷移します。',
        finalActionBtnColor: 'bg-green-800 hover:bg-green-900'
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
