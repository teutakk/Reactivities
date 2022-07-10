using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace API.Controllers
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());

            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //Adding THE ACTIVITY in memory tracking the fact we are adding an activity to our activities in ccontext 
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
                //equivalent to nothing 
            }
        }
    }
}