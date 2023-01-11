import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <p>메인페이지입니다리</p>
        <p>
          <a href="https://nextjs.org/learn">Next.js 튜토리얼</a> 참고해서 만든
          앱입니다리
        </p>
      </section>
    </Layout>
  );
}
