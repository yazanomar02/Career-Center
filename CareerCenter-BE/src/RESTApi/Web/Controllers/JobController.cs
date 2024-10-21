using Application.Features.Categories.Queries.GetCategories;
using Application.Features.Jobs.Commands.CreateJob;
using Application.Features.Jobs.Queries.GetJobs;
using Application.Features.Providers.Commands.CreateProvider;
using Application.Features.Providers.Commands.UpdateProvider;
using Application.Features.Providers.Queries.GetProviders;
using Application.Features.Services.Commands.DeleteService;
using Application.Interfaces;
using AutoMapper;
using Azure.Core;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence.Data;
using Web.ViewModels;

namespace Web.Controllers
{
  
    public class JobController : ApiControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JobController(ApplicationDbContext context)
        {
            this._context = context;
        }

        [HttpGet("job")]
        public async Task<ActionResult<List<JobQueryVm>>> Get()
        {
            return await Mediator.Send(new GetJobsQuery());
        }

        [HttpPost("category/{id}/job")]
        public async Task<ActionResult<Guid>> Create(Guid id, JobVm command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await Mediator.Send(new CreateJobCommand(id, command));

            return result;
        }

        [HttpPut("job/{id}")]
        public async Task<ActionResult> Update(Guid id, [FromBody] JobForUpdate job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingJob = await _context.Set<Job>().FindAsync(id);
            if (existingJob == null)
            {
                return NotFound();
            }

            existingJob.Title = job.Title;
            existingJob.Description = job.Description;
            existingJob.Count = job.Count;
            existingJob.Url = job.Url;

            _context.Jobs.Update(existingJob);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("job/{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var job = await _context.Set<Job>().FindAsync(id);
            if (job == null)
                throw new Exception("Not Found");

            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
