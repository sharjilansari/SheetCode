export default function Description() {
  return (
    <div className="bg-[#252526] text-gray-300 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white mb-3">
        Problem Statement
      </h2>
      <p className="text-gray-400 leading-relaxed">
        You are given a coding environment where you can write and execute code
        in various languages. Your task is to implement a function that solves a
        given problem efficiently. The problem may involve data structures,
        algorithms, or logical reasoning.
      </p>
      <h3 className="text-lg font-medium text-white mt-4">Example</h3>
      <pre className="bg-[#1E1E1E] text-gray-300 p-4 rounded-md text-sm overflow-x-auto">
        {`// Example: Reverse a string
  function reverseString(str) {
    return str.split('').reverse().join('');
  }
  
  console.log(reverseString("hello")); // Output: "olleh"`}
      </pre>
    </div>
  );
}
