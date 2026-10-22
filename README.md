# ソナエデザイン

施設と企業の防災研修・訓練・BCP支援のメインサイト。2026-10-22に情報設計とデザインを刷新。

- 公開URL：https://taka565.github.io/sonae-design/
- リポジトリ：https://github.com/taka565/sonae-design

## 構成

トップで仕事内容を明示し、「施設・業種 → 現場の課題 → 支援内容 → ご相談」の順で案内します。

| ページ | 内容 |
| --- | --- |
| index.html | 5つの対象別入口、3つの支援、進め方・料金、ACTION OS、FAQ、受付状況 |
| education.html | 企業の保育園、幼稚園、公私立学校、小児関連施設 |
| sports.html | スポーツ施設・クラブ・体操教室・スポーツ団体 |
| care.html | 高齢者関連施設、介護事業所、福祉施設 |
| hospitality.html | ホテル・旅館・その他宿泊施設 |
| business.html | 一般企業の総務・防災・BCP担当者、経営者 |
| action-os.html | ACTION OSの機能、公開アプリへのリンク、利用範囲 |
| resources.html | 読みもの3本、公的支援、関連メディア |

各業種ページのシナリオは支援内容を説明するための想定例です。実績・事例とは表記していません。
資格、顧客、固定料金、全国対応、講師の経歴等の未確認情報は掲載していません。

## 編集・確認

Node.jsのみで動きます。外部ライブラリのインストールは不要です。

```powershell
npm run check
npm run build
npm run verify
npm start
```

- `scripts/build.mjs`：各ページの原稿、共通ヘッダー・フッター、HTMLとsitemapの生成
- `dist/style.css`：共通スタイルとレスポンシブ表示
- `dist/app.js`：モバイルメニュー、情報ダイアログ、記事の直接リンク、メール窓口・関連メディアの設定反映
- `dist/settings.js`：確認済みの連絡先・運営者・関連メディアURL
- `scripts/verify.mjs`：8ページ、内部リンク・フラグメント・画像、見出し・ID、問い合わせ状態の構造確認

HTMLは生成物です。原稿は `scripts/build.mjs` を編集して再生成してください。
プレビューは http://127.0.0.1:4187/ 。公開対象は `dist/` です。

## 問い合わせの受付

電話番号・メールアドレスが未確定のため「受付準備中」と明記しています。
旧版の送信できない相談メモフォームは削除しました。フォーム送信や顧客データ収集の機能はありません。

確認済みのメールアドレスを `dist/settings.js` の `contactEmail` に設定すると、各ページの受付表示が切り替わり、ページの相談テーマを件名に入れたメールリンクが表示されます。
メールアプリを起動する方式です。受付開始時は運営者情報・プライバシー案内・サービス条件も整えてください。

未確定の項目：運営者名・代表者・所在地、問い合わせ先、料金・対応地域・提供条件、講師の経歴・実績、関連サイトURL。

## 公開

`main` へのpushでGitHub Actionsが構文チェック、ページ生成、内部リンク確認を行い、`dist/` をGitHub Pagesへ反映します。
GitHubリポジトリのソースも公開されます。秘密情報を追加しないでください。
以前のSites登録情報 `.openai/` はGitの公開対象外で、Sitesにはデプロイしていません。

## 画像・情報の根拠

- `dist/assets/readiness-workshop.png`：組み込みImageGenで生成した机上訓練のイメージ。実在の施設・顧客の実績写真ではありません。プロンプトは `ASSET-PROMPT-V2.txt`。
- `dist/assets/action-os-screen.png`：2026-10-20の公開アプリのホーム画面。紹介内容は2026-10-22に公開画面と照合。
- `dist/assets/mark.svg`：ブランドマーク。
- 旧ヒーロー `sonae-town.png` と旧プロンプトは履歴資料として残しています。現行ページからは参照しません。

公的情報は各ページから公式案内にリンクしています。

- 中小企業庁 BCP策定運用指針：https://www.chusho.meti.go.jp/bcp/contents/level_a/bcpgl_01.html （2026-10-20確認）
- 東京都中小企業振興公社 BCP実践促進助成金：https://www.tokyo-kosha.or.jp/support/josei/setsubijosei/bcp.html （2026-10-22確認）

助成制度は対象法人・経費・期間に制限があります。学校法人・社会福祉法人・医療法人等は対象外と明記し、相談料・研修費への適用を保証していません。
ACTION OSには小児・乳児の専用救命手順が未実装であることを専用ページに明記しています。
