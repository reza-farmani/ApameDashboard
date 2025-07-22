type TitleProps = {
  value: string;
};


function Title({ value }: TitleProps) {
  return <h1 className="text-2xl sans-semiBold tex block">{value}</h1>
}

export default Title