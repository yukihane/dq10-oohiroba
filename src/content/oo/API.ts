type Item = {
  id: string;
  name: string;
  category: string;
};

const parser = new DOMParser();

export const searchItem = async (name: string) => {
  const url = encodeURI(`https://hiroba.dqx.jp/sc/search/${name}/item/`);

  const response = await fetch(url);
  if (response.ok) {
    const text = await response.text();
    const doc = parser.parseFromString(text, "text/html");
    const rows = doc.querySelectorAll(".searchItemTable > tbody > tr");

    const items = [...rows].map((row) => {
      const link = row.querySelector(".strongLnk");
      const id = link?.getAttribute("href")?.split("/")[4];
      const name = link?.textContent;
      const category = row.querySelector(
        ".searchItemTable > tbody > tr > td:nth-of-type(2) a"
      )?.textContent;
      return { id, name, category } as Item;
    });

    const maxPageCount = getMaxPageCount(doc.documentElement);

    console.log(`maxPageCount: ${maxPageCount}`);
    items.forEach((i) => console.log(i));
  }
};

/**
 * 0始まりの最大ページ数を返します。
 */
const getMaxPageCount = (elm: Element): number => {
  const pageLinks = elm.querySelectorAll<HTMLInputElement>(
    ".pageNavi > ul > li > a"
  );
  if (pageLinks.length === 0) {
    return 0;
  }

  const pages = [...pageLinks].map((link) => Number(link.dataset.pageno));
  return Math.max(...pages);
};
