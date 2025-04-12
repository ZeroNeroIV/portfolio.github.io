document.addEventListener("DOMContentLoaded", () => {
  const projectList = document.getElementById("project-list");

  // Show loading spinner
  projectList.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div class="spinner"></div>
      <p>Loading projects...</p>
    </div>
  `;

  // Function to format project name (convert hyphenated names to spaced format)
  function formatProjectName(name) {
    return name
      .replace(/-/g, ' ')  // Replace hyphens with spaces
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
      .replace(/\s+([a-z])/g, (match, group1) => ' ' + group1.toUpperCase()); // Capitalize subsequent words
  }

  // Fetch GitHub repositories
  async function fetchProjects() {
    try {
      const response = await fetch("https://api.github.com/users/ZeroNeroIV/repos");
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const repos = await response.json();

      projectList.innerHTML = ""; // Clear loading spinner

      if (repos.length === 0) {
        projectList.innerHTML = "<p>No projects available at the moment.</p>";
        return;
      }

      repos.forEach(repo => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        const formattedName = formatProjectName(repo.name);
        const description = repo.description || "No description available.";

        projectCard.innerHTML = `
          <h3>${formattedName}</h3>
          <p title="${description}">${description}</p>
          <a href="${repo.html_url}" target="_blank">
            <i class="fab fa-github"></i> View on GitHub
          </a>
        `;

        projectList.appendChild(projectCard);
      });
    } catch (error) {
      console.error("Error fetching GitHub projects:", error);
      projectList.innerHTML = "<p>Unable to load projects at the moment.</p>";
    }
  }

  fetchProjects();
});
