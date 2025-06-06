
// src/sections/About.tsx
export function About({ language }: { language: 'en' | 'zh' }) {
  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-bold mb-4">
        {language === 'zh' ? '关于我？' : 'About Me?'}
      </h2>
      <p className="max-w-2xl">
        {language === 'zh'
          ? '一个还在持续学习、试验、改写 bug 的普通人类。偶尔写点音乐、偶尔敲点代码，更多时候在思考如何把它们融合。'
          : 'Just a human still learning, tinkering, rewriting bugs. Sometimes writing music, sometimes typing code — often trying to merge the two.'}
      </p>
    </section>
  );
}
