interface SummaryBoard {
  summary: string;
}
const SummaryBoard: React.FC<SummaryBoard> = ({ summary }) => {
  return (
    <>
      <div className=" rounded-2xl text-xl border-2 px-4 py-3 text-start">
        {summary}
      </div>
    </>
  );
};
export default SummaryBoard;
