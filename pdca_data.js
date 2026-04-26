const pdcaData = {
  prologue: {
    text: "ある日のPDCA探偵局。依頼人の「一匹狼（※完全室内飼い）」が泣きついてきた。\\n『学園のWi-Fiが遅すぎて、授業の動画が全然見られないニャ！...いや、見られないガルル！探偵さん、なんとかしてほしいガル！』",
    image: "file:///C:/Users/ryuto/.gemini/antigravity/brain/f90357b8-79ae-45cf-be1d-1a4f2a020646/cute_wolf_cat_client_1777194125412.png"
  },
  investigation: {
    description: "まずは依頼人から情報を集めよう。気になる箇所をクリックして手がかりを探すのだ。",
    spots: [
      { id: "spot1", label: "【証言】遅くなる時間帯", text: "『いつも昼休みの時間に遅くなるガル！午前中は普通に見れるガルル！』" },
      { id: "spot2", label: "【証言】周りの生徒の様子", text: "『昼休みはみんなスマホで高画質のゲーム実況とかを見てる気がするガル。』" },
      { id: "spot3", label: "【証言】ルーターの状態", text: "『ルーターは最近新しいものに交換されたばかりらしいガルよ。』" }
    ]
  },
  phases: [
    {
      id: "plan",
      name: "Plan (計画)",
      description: "まずは問題を明確にし、解決のための目標と計画を立てよう。どの行動を選ぶべきか？",
      cards: [
        { id: "p1", text: "いきなりWi-Fiのルーターを全て最新機種に買い替える", isCorrect: false, feedback: "原因がわからないまま行動するのはギャンブルだ！まずは調査計画が必要だ。" },
        { id: "p2", text: "原因を推測し、ネットワークの使用状況を調査する計画を立てる", isCorrect: true, feedback: "正解！まずは「なぜ遅いのか」を調べるための計画（Plan）を立てるのが基本だ。" },
        { id: "p3", text: "生徒全員のスマホを没収する", isCorrect: false, feedback: "それは強引すぎる！根本的な解決にはならないぞ。" }
      ]
    },
    {
      id: "do",
      name: "Do (実行)",
      description: "立てた計画を実行に移そう。どんな行動をとる？",
      cards: [
        { id: "d1", text: "計画通り、各クラスの通信量と時間帯のデータを1週間測定して記録する", isCorrect: true, feedback: "正解！計画（Plan）で決めたことを忠実に実行（Do）し、データを集めよう。" },
        { id: "d2", text: "計画を無視して、とりあえず怪しいと思う生徒を注意して回る", isCorrect: false, feedback: "計画を無視してはPDCAサイクルが回らない！まずは計画通りに実行（Do）しよう。" },
        { id: "d3", text: "調査が面倒になったので、もう一度別の計画を立て直す", isCorrect: false, feedback: "実行（Do）せずに計画（Plan）ばかりしていても問題は解決しないぞ！" }
      ]
    },
    {
      id: "check",
      name: "Check (評価)",
      description: "実行した結果を評価しよう。どうすればいい？",
      cards: [
        { id: "c1", text: "集まったデータを見ずに、ルーターが悪いと決めつける", isCorrect: false, feedback: "せっかく実行（Do）でデータを集めたのに、評価（Check）しないのはもったいない！" },
        { id: "c2", text: "集まった通信量データを分析し、昼休みに一部の生徒が高画質動画を大量に見ていることを突き止める", isCorrect: true, feedback: "正解！実行（Do）の結果を客観的に評価（Check）し、本当の原因を特定した！" },
        { id: "c3", text: "データを分析して原因がわかったので、そのまま放置する", isCorrect: false, feedback: "原因がわかって終わりではない。次の改善（Action）に繋げなければ意味がないぞ！" }
      ]
    },
    {
      id: "action",
      name: "Action (改善)",
      description: "評価結果をもとに、改善策を実行しよう！",
      cards: [
        { id: "a1", text: "昼休みの高画質動画視聴に制限をかけるルールを作り、全校生徒に周知して様子を見る", isCorrect: true, feedback: "大正解！評価（Check）をもとに改善策（Action）を実施し、次のPlanへと繋げる見事なサイクルだ！" },
        { id: "a2", text: "高画質動画を見ていた生徒を退学にする", isCorrect: false, feedback: "やりすぎだ！ルール作りなど、適切な改善（Action）を行おう。" },
        { id: "a3", text: "原因がわかったことに満足して、何もせず家に帰る", isCorrect: false, feedback: "それじゃあ元の木阿弥だ！改善（Action）を行って初めて問題解決だ！" }
      ]
    }
  ],
  epilogue: {
    text: "【MISSION CLEARED!】\\n見事なPDCAサイクルによって、学園のネットワークは快適になった！\\n情報社会の問題解決には、常にPDCAを回し続けることが重要だ！",
    password: "PDCAサイクルに巻き込まれた猫"
  }
};
