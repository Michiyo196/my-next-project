import { notFound } from "next/navigation";
import { getNewsList } from "@/app/_libs/microcms";
import Pagination from "@/app/_components/Pagination";
import NewsList from "@/app/_components/NewsList";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: Promise<{
    current: string;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const current = parseInt(params.current, 10);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
  });

  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <NewsList news={news} />
      <Pagination totalCount={totalCount} current={current} />
    </>
  );
}
