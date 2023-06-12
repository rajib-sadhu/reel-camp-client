

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:ps-20 md:text-left text-center" >
            <h2 className="uppercase text-4xl font-bold">{heading}</h2>
            <span className="mt-2 w-[10rem] md:me-auto mx-auto block border-b-4 border-green-600 border-" ></span>
            <h4 className="mt-2 text-lg uppercase">{subHeading}</h4>
        </div>
    );
};

export default SectionTitle;