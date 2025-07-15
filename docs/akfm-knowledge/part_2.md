---
title: "第2部 コンポーネント設計"
---

React Server Componentsの[RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)には以下のような記述があります。

> The fundamental challenge was that React apps were client-centric and weren’t taking sufficient advantage of the server.
> <以下Deepl訳>
> 根本的な課題は、Reactアプリがクライアント中心で、サーバーを十分に活用していないことだった。

Reactコアチームは、Reactが抱えていたいくつかの課題を個別の課題としてではなく、根本的には「サーバーを活用できていない」ということが課題であると考えました。そして、サーバー活用と従来のクライアント主体なReactの統合を目指し、設計されたアーキテクチャがReact Server Componentsです。

[_第1部 データフェッチ_](part_1)で解説してきた通り、特にデータフェッチに関しては従来よりシンプルでセキュアに実装できるようになったことで、ほとんどトレードオフなくコンポーネントにカプセル化することが可能となりました。一方コンポーネント設計においては、従来のクライアント主体のReactコンポーネント相当であるClient Componentsと、Server Componentsをうまく統合していく必要があります。

第2部ではReact Server Componentsにおけるコンポーネント設計パターンを解説します。
