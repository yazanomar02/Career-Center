using Application.Features.Comments.Commands.CreateComment;
using Application.Features.Projects.Commands.CreateProject;
using Application.Features.Projects.Queries.GetProjects;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;
using System.Text.Json;
using Web.ViewModels;

namespace Web.Controllers
{

    public class ProjectController : ApiControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectController(ApplicationDbContext context)
        {
            this._context = context;
        }

        [HttpGet("project")]
        public async Task<ActionResult<List<ProjectVm>>> Get(int pageNumber, int pageSize)
        {
            var(projects, pagination) = await Mediator.Send(new GetProjectsQuery(pageNumber, pageSize));

            
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(pagination));

            return Ok(projects);
        }

        [HttpPost("project")]
        public async Task<ActionResult<Guid>> Create(CreateProjectCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await Mediator.Send(command);

            return result;
        }

        [HttpPut("project/{id}")]
        public async Task<ActionResult> Update(Guid id, [FromBody] ProjectForUpdate project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingProject = await _context.Set<Project>().FindAsync(id);
            if (existingProject == null)
            {
                return NotFound();
            }

            existingProject.Title = project.Title;
            existingProject.Description = project.Description;

            _context.Projects.Update(existingProject);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("project/{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var project = await _context.Set<Project>().FindAsync(id);
            if (project == null)
                throw new Exception("Not Found");

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
