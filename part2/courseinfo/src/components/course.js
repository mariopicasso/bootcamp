const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
    
    const sum = course.parts.reduce(
        (sum, actualValue) => sum + actualValue.exercises,
        0
    );
    return <strong><p>Total of exercises {sum}</p></strong>;
};

const Part = ({part}) => {
    if (part===undefined){
        return <></>
    }
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Content = ({ course }) => {
    return (
        <div>
            <Part part={course.parts[0]} />
            <Part part={course.parts[1]} />
            <Part part={course.parts[2]} />
        </div>
    );
};

const Course = ({ course }) => {
    console.log(course);
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

export default Course;