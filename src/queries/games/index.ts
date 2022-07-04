export const gameAllQuery = (): any => {
  return {
    include: {
      screenshots: {
        select: {
          id: true,
          caption: true,
          url: true,
        },
      },
      videos: {
        select: {
          id: true,
          caption: true,
          url: true,
        },
      },
      companies: {
        select: {
          developer: true,
          publisher: true,
          company: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      platforms: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      releases: {
        select: {
          region: true,
          release_human: true,
          platform: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
    take: 10,
  };
};

export const gameSingleByIdQuery = (gameId: number): any => {
  return {
    where: {
      id: gameId,
    },
    include: {
      screenshots: {
        select: {
          id: true,
          caption: true,
          url: true,
        },
      },
      videos: {
        select: {
          id: true,
          caption: true,
          url: true,
        },
      },
      companies: {
        select: {
          developer: true,
          publisher: true,
          company: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      platforms: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      releases: {
        select: {
          region: true,
          release_human: true,
          platform: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  };
};

export const gameSingleBySlugQuery = (gameSlug: string): any => {
  return {
    where: {
      slug: gameSlug,
    },
    include: {
      screenshots: {
        select: {
          id: true,
          caption: true,
          url: true,
        },
      },
      videos: {
        select: {
          id: true,
          caption: true,
          url: true,
        },
      },
      companies: {
        select: {
          developer: true,
          publisher: true,
          company: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      platforms: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      releases: {
        select: {
          region: true,
          release_human: true,
          platform: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  };
};
