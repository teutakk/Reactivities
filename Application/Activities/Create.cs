using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace API.Controllers
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
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
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //Adding THE ACTIVITY in memory tracking the fact we are adding an activity to our activities in ccontext 
                _context.Activities.Add(request.Activity);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Success(Unit.Value);
                //equivalent to nothing 
            }
        }
    }
}