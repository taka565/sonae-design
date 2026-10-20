# ソナエデザイン

防災・BCP・危機対応支援のメインサイト。2026-10-20制作。
「ソナエデザイン」は仮ブランド。商標・ドメインの利用可否を確定するものではありません。

## ローカルで見る

Node.jsで `npm start` を実行し、表示されたURLを開いてください。
追加ライブラリやビルドは不要です。公開対象は `dist/`。

## 構成

- 考え方・背景（公的資料へのリンクつき）
- BCP策定／改善、職員研修、机上訓練、実践訓練、講師、月額・年間顧問
- ACTION OSの紹介と公開アプリへのリンク
- 支援の進め方
- 原稿付きの読み物3本とカテゴリー絞り込み
- 関連メディア欄（URL確定まで準備中）
- 公的支援制度、FAQ
- 問い合わせ準備中の案内、端末へダウンロードできる相談メモ

## 掲載前に確定する情報

`dist/settings.js` に連絡先・運営者情報・サテライトサイトURLを設定できます。
問い合わせメールを設定するとメールリンクが表示されます。フォーム送信バックエンドはありません。
相談メモは端末へのテキストダウンロードのみ。送信完了を表示しません。

- ブランド名、運営者名、代表者、所在地
- メールアドレス、受付方法、必要なら電話番号
- サービス提供条件・料金・対応地域・講師の経歴と実績
- 公開用プライバシーポリシー
- 関連サイトURL
- 必要に応じて独自ドメイン・商標等の確認

運営者の資格・実績・顧客数・推薦文・固定料金・全国対応等は未確認のため掲載していません。
GitHub Pagesで一般公開します。GitHubリポジトリのソースコードも公開対象です。
制作時に登録したSitesの設定 `.openai/` はGitの公開対象から除外し、Sitesにはデプロイしていません。

## 公開・更新

- 公開URL：https://taka565.github.io/sonae-design/
- リポジトリ：https://github.com/taka565/sonae-design
- `main` へのpushでJavaScriptの構文確認後、`dist/` をGitHub Pagesへ自動反映
- 手動で再公開する場合はGitHubのActionsから `Verify and publish SONAE DESIGN` を実行

```powershell
npm run check
git add dist README.md
git commit -m "Update SONAE DESIGN"
git push origin main
```

GitHub Actionsの失敗時は公開が更新されません。Actionsの実行結果を確認してください。

## 情報の根拠

確認日：2026-10-20

- 中小企業庁 BCP策定運用指針
  https://www.chusho.meti.go.jp/bcp/contents/level_a/bcpgl_01.html
- 厚生労働省 介護保険事業の基本指針
  https://www.mhlw.go.jp/web/t_doc?dataId=00013180&dataType=0
- 東京都中小企業振興公社 BCP実践促進助成金
  https://www.tokyo-kosha.or.jp/support/josei/setsubijosei/bcp.html

助成制度は対象法人・経費・期間に制限があり、相談料・研修費への適用を保証する表現はしていません。
定期的に公式情報を確認してください。

ACTION OSは https://taka565.github.io/action-os/ と既存ソースの機能を照合して紹介しています。
医療手順そのものは本サイトには掲載していません。

## 画像

`dist/assets/sonae-town.png` は組み込みImageGenによるイメージ画像で、実在の施設・実績写真ではありません。
`dist/assets/action-os-screen.png` は2026-10-20の公開アプリのホーム画面です。
`dist/assets/mark.svg` は仮のブランドマークです。
記事のイメージはCSS図形で構成しています。

画像生成プロンプトは `ASSET-PROMPT.txt` に保存しています。
